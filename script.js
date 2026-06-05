window.onload = () => {
    loadProgress()
    loadTheme()
}
const generatorBtn = document.querySelector('#generatorBtn')
const practiseBtn = document.querySelector('#practiseBtn')
const generateBtn = document.querySelector('#generate')
const startBtn = document.querySelector('#start')
const counter = document.querySelector('#counter')
const numInput = document.querySelector('input')
const container = document.querySelector('#table-output')
const primeri = document.querySelector('#primer')
const theoryBtn = document.querySelector('#theoryBtn')
const theory = document.querySelector('#theory')
const theory_p = document.querySelectorAll('#theory p')
const theory_h2 = theory.querySelector('h2')
const theory_h3 = theory.querySelector('h3')
const generation_p = document.querySelector('.generation p')
const title = document.querySelector('h1')
const theoryRowInputs = theory.querySelectorAll('input')
const practiseMode = document.querySelector('.practise-mode')
const generate2Btn = document.querySelector('.generate-btn')
const changeTheme = document.querySelector('#themeChanger')
const errorCheck = document.querySelector('#error')
const rightCheck = document.getElementById('rightCheck')
const rightAnswers = document.getElementById('rightAnswers')

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.remove('dark')
        document.body.classList.add('light')
        container.classList = document.body.classList
        if (container.hasChildNodes()) {
            container.style.borderColor = 'rgb(106, 125, 158)'
            for (let element of container.querySelectorAll('div')) {
                element.style.color = 'black'
                if (!element.classList.contains('lastChild')) {
                    element.style.borderBottom = '1px solid rgb(106, 125, 158)'
                }
            }
        }
        for (let input of theoryRowInputs) {
            input.classList.add('light')
            input.classList.remove('dark')
        }

        if (practiseMode.hasChildNodes('.mainBox')) {
            if (rightCheck.textContent == 'Пожалуйста, введите ответ') {
                rightCheck.style.color = 'rgb(85, 152, 194)'
            } else if (rightCheck.textContent == 'Вы прошли всю таблицу!') {
                rightCheck.style.color = 'rgb(85, 152, 194)'
            }
        }
        counter.classList = document.body.classList
        title.classList = document.body.classList
        generation_p.classList = document.body.classList
        generation_p.classList = document.body.classList
        for (let p of theory_p) {
            p.classList = document.body.classList
        }
        generateBtn.classList = document.body.classList
    } else if (theme === 'dark') {
        document.body.classList.remove('light')
        document.body.classList.add('dark')
        container.classList = document.body.classList
        if (container.hasChildNodes()) {
            for (let element of container.querySelectorAll('div')) {
                element.style.color = 'aliceblue'
                if (!element.classList.contains('lastChild')) {
                    element.style.borderBottom = '1px solid aliceblue'
                }
                container.style.borderColor = 'aliceblue'
            } 
        }
        for (let input of theoryRowInputs) {
            input.classList.add('dark')
            input.classList.remove('light')
        }

        if (practiseMode.hasChildNodes('.mainBox')) {
            if (rightCheck.textContent == 'Пожалуйста, введите ответ') {
                rightCheck.style.color = 'aliceblue'
            } else if (rightCheck.textContent == 'Вы прошли всю таблицу!') {
                rightCheck.style.color = 'aliceblue'
            }
        }

        counter.classList = container.classList
        title.classList = document.body.classList
        for (let p of theory_p) {
            p.classList = document.body.classList
        }
        generation_p.classList = document.body.classList
        generateBtn.classList = document.body.classList
    }
    localStorage.setItem('currentTheme', theme)
}

changeTheme.addEventListener('click', function(event) {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark'
    applyTheme(newTheme)
})

function loadTheme () {
    let savedTheme = localStorage.getItem('currentTheme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
        applyTheme(savedTheme)
    } else {
        applyTheme('light')
    }
}

practiseBtn.addEventListener('click', function(event) {
    practiseBtn.classList.add('active')
    generatorBtn.classList.remove('active')
    theoryBtn.classList.remove('active')
    rerender()
})


loadProgress = () => {
    const saved = localStorage.getItem('multiplicationTrainer')
    if (saved) {
        const state = JSON.parse(saved)
        a = state.a
        b = state.b
        schet = state.schet
        counterMistakes = state.counterMistakes
        if (b > 2) {
            startBtn.textContent = 'Продолжить'
        }
        if (practiseBtn.classList.contains('active')) {
            counter.textContent = `Примеров осталось: ${schet}`
            counter.style.color = document.body.style.backgroundColor
            test()
        }
    }
}

generatorBtn.addEventListener('click', function(event) {
    practiseBtn.classList.remove('active')
    theoryBtn.classList.remove('active')
    generatorBtn.classList.add('active')
    rerender()
})

theoryBtn.addEventListener('click', function(event) {
    practiseBtn.classList.remove('active')
    theoryBtn.classList.add('active')
    generatorBtn.classList.remove('active')
    rerender()
})

function generate(number) {
    container.innerHTML = ''
    for (let i = 1; i <= 10; i++) {
        let table = document.createElement('div')
        document.body.classList.contains('dark') ? table.classList.add('dark') : table.classList.remove('dark')
        document.body.classList.contains('light') ? table.classList.add('light') : table.classList.remove('light')
        table.textContent = `${number} x ${i} = ${i * number}`
        if (i == 10) {
            table.classList.add('lastChild')
        }
        table.classList.add('table')
        container.appendChild(table)
        document.body.classList.contains('dark') ? container.style.border = '2px solid #ffffff' : container.style.border = '2px solid #6a7d9e'
        document.body.classList.contains('light') ? container.style.border = '2px solid #6a7d9e' : container.style.border = '2px solid #ffffff'
        container.style.padding = '10px'
        container.style.animation = 'start 0.9s ease-out forwards;'
    }
}

let a = 2
let b = 2
let counterMistakes = 3
let schet = 45
const saveProgress = () => {
    const state = {
        schet,
        a,
        b,
        counterMistakes
    }
    localStorage.setItem('multiplicationTrainer', JSON.stringify(state))
}

function test() {
    counter.textContent = `Примеров осталось: ${schet}`
    primeri.innerHTML = ''
    let mainBox = document.createElement('div')
    mainBox.style.display = 'flex'
    mainBox.classList.add('mainBox')
    mainBox.style.flexDirection = 'column'
    mainBox.style.alignItems = 'center'
    mainBox.style.gap = '15px'

    let topRow = document.createElement('div')
    topRow.style.display = 'flex'
    topRow.classList.add('topRow')
    topRow.style.alignItems = 'center'
    topRow.style.gap = '10px'

    let questionText = document.createElement('span')
    questionText.classList.add('questionText')
    questionText.textContent = `${a} * ${b}`


    let reshenie = document.createElement('input')
    reshenie.type = 'number'
    reshenie.classList.add('reshenie')
    reshenie.placeholder = 'Произведение'
    reshenie.style.padding = '5px'
    reshenie.min = '0'
    
    topRow.appendChild(questionText)
    topRow.appendChild(reshenie)

    let checkBtn = document.createElement('button')
    checkBtn.textContent = 'Проверить ответ'
    checkBtn.className = 'generate-btn'

    reshenie.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault()
            checkBtn.click()
            saveProgress()
        } 
    })
    mainBox.appendChild(topRow)
    mainBox.appendChild(checkBtn)
    primeri.appendChild(mainBox)
    reshenie.focus()
    checkBtn.addEventListener('click', function(event) {
        if (+reshenie.value == a * b) {
            rightCheck.textContent = 'Правильно!'
            rightCheck.style.color = `rgb(87, 224, 176)`

            reshenie.focus()
            schet -= 1

            b++
            saveProgress()
            if (b > 10) {
                a++
                b = a // Логика избегания повторов
                saveProgress()
            }
            if (a > 10) {
                document.body.classList.contains('dark') ? rightCheck.style.color = 'aliceblue' : rightCheck.style.color = '#5e93b4'
                rightCheck.textContent = 'Вы прошли всю таблицу!'

                topRow.innerHTML = ''
                counter.textContent = ''
                mainBox.innerHTML = ''
                a = 2
                b = 2
                counterMistakes = 3
                schet = 45
                startBtn.textContent = 'Начать'
                saveProgress()
            } else {
                counter.textContent = `Примеров осталось: ${schet}`
                saveProgress()
                test()
            }

        } else if (reshenie.value == '') {
            rightCheck.textContent = 'Пожалуйста, введите ответ'; 
            document.body.classList.contains('light') ? rightCheck.style.color = '#5598c2' : rightCheck.style.color = 'aliceblue'
            saveProgress()

        } else if (+reshenie.value != a * b && reshenie.value != '') {
            counterMistakes--
            saveProgress()
            if (counterMistakes == 2) {
                rightCheck.textContent = 'Неверно, осталось 2 попытки'
                rightCheck.style.color = `rgb(233, 108, 108)`

                reshenie.value = ''
                saveProgress()
            } else if (counterMistakes == 1) {
                rightCheck.textContent = 'Неверно, последняя попытка'
                rightCheck.style.color = `rgb(233, 108, 108)`

                reshenie.value = ''
                saveProgress()
            } else {
                rightCheck.textContent = 'Вы ошиблись слишком много раз. Начнем заново'

                rightCheck.style.color = `rgb(233, 108, 108)`
                a = 2; b = 2; counterMistakes = 3; schet = 45
                questionText.textContent = `${a} * ${b}`
                saveProgress()
                test()
            }
        }
        saveProgress()
    })
    if (b > 2 && !practiseBtn.classList.contains('active') && a <= 10 && b <= 10) {
        startBtn.textContent = 'Продолжить'
    } 
}

function rerender() {
    if (practiseBtn.classList.contains('active')) {
        document.querySelector('.generation').style.display = 'none'
        document.querySelector('#theory').style.display = 'none'
        document.querySelector('.practise-mode').style.display = 'block'
        container.innerHTML = ''
        container.style.borderColor = document.body.style.backgroundColor
        counter.style.color = document.body.style.backgroundColor
        errorCheck.textContent = ''
        numInput.value = ''
    } else if (generatorBtn.classList.contains('active')) {
        document.querySelector('.practise-mode').style.display = 'none'
        document.querySelector('.generation').style.display = 'block'
        document.querySelector('#theory').style.display = 'none'
        primeri.innerHTML = ''
        rightCheck.textContent = ''
        startBtn.classList.remove('started')
    } else if (theoryBtn.classList.contains('active')) {
        document.querySelector('#theory').style.display = 'block'
        document.querySelector('.generation').style.display = 'none'
        document.querySelector('.practise-mode').style.display = 'none'
        container.innerHTML = ''
        container.style.borderColor = document.body.style.backgroundColor
        primeri.innerHTML = ''
        rightCheck.textContent = ''
        errorCheck.textContent = ''
        startBtn.classList.remove('started')
        numInput.value = ''
    }
    if (b > 2 && !practiseBtn.classList.contains('active') && a <= 10 && b <= 10) {
        startBtn.textContent = 'Продолжить'
    } 
}

rerender()

generateBtn.addEventListener('click', function(event) {
    if (numInput.value == '') {
        errorCheck.textContent = 'Выберите число для генерации таблицы умножения (не больше 5 знаков)'

    } else if (numInput.value.length > 5) {
        errorCheck.textContent = 'Ошибка: слишком длинное число'
        numInput.value = ''
    } else {
        generate(numInput.value)
        errorCheck.textContent = ''
        numInput.value = ''
    }
})

let zad1_propusk = document.querySelector('#zad1-propusk')
let zad1_ravno = document.querySelector('#otvet-zad1')
let zad2_propusk = document.querySelector('#zad2-propusk')
let zad2_ravno = document.querySelector('#zad2-otvet')
let zad3_otvet = document.querySelector('#otvet-zadachka1')
let zad4_otvet = document.querySelector('#otvet-zadachka2')
let checkAnswersBtn = document.querySelector('#checkAnswers')

let theoryTasks = document.querySelector('.theory-tasks')

let mistakeCounter = 0

theoryTasks.addEventListener('input', function(event) {
    event.target.style.border = '1px solid rgb(85, 152, 184)'
})

function zadachki() {
    if (+zad1_propusk.value != 5) {
        zad1_propusk.style.border = '5px solid crimson'
        mistakeCounter++
    } else if (+zad1_propusk.value == 5) {
        zad1_propusk.style.border = '5px solid yellowgreen'
    }

    if (+zad1_ravno.value == 10) {
        zad1_ravno.style.border = '5px solid yellowgreen'
    } else if (+zad1_ravno.value != 10) {
        zad1_ravno.style.border = '5px solid crimson'
        mistakeCounter++
    }

    if (+zad2_propusk.value == 6) {
        zad2_propusk.style.border = '5px solid yellowgreen'
    } else {
        zad2_propusk.style.border = '5px solid crimson'
        mistakeCounter++
    }

    if (+zad2_ravno.value == 18) {
        zad2_ravno.style.border = '5px solid yellowgreen'
    } else {
        zad2_ravno.style.border = '5px solid crimson'
        mistakeCounter++
    }

    if (+zad3_otvet.value == 24) {
        zad3_otvet.style.border = '5px solid yellowgreen'
    } else if (+zad3_otvet.value != 24 ){
        zad3_otvet.style.border = '5px solid crimson'
        mistakeCounter++
    }

    if (+zad4_otvet.value == 18) {
        zad4_otvet.style.border = '5px solid yellowgreen'
    } else if (+zad4_otvet.value != 18) {
        zad4_otvet.style.border = '5px solid crimson'
        mistakeCounter++
    }
}

checkAnswersBtn.addEventListener('click', function(event) {
    zadachki()
    if (mistakeCounter == 0) {
        rightAnswers.textContent = 'Все верно!'
        rightAnswers.style.color = 'yellowgreen'
    } else if (mistakeCounter == 1) {
        rightAnswers.textContent = 'У вас 1 ошибка'
        rightAnswers.style.color = `rgb(167, 223, 125)`
    } else if (mistakeCounter == 6 || mistakeCounter == 5) {
        rightAnswers.textContent = `У вас ${mistakeCounter} ошибок`
        rightAnswers.style.color = 'crimson'
    } else {
        rightAnswers.textContent = `У вас ${mistakeCounter} ошибки`
        rightAnswers.style.color = `rgb(212, 212, 40)`
    }
    mistakeCounter = 0
})

startBtn.addEventListener('click', function(event) {
    startBtn.classList.add('started')
    test()
})
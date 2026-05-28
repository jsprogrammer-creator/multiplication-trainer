let generatorBtn = document.querySelector('#generatorBtn')
let practiseBtn = document.querySelector('#practiseBtn')
let generateBtn = document.querySelector('#generate')
let startBtn = document.querySelector('#start')
let counter = document.querySelector('#counter')
let numInput = document.querySelector('input')
let container = document.querySelector('#table-output')
let primeri = document.querySelector('#primer')
let theoryBtn = document.querySelector('#theoryBtn')
let theory = document.querySelector('#theory')
let theory_p = document.querySelector('#theory p')

let rightCheck = document.getElementById('rightCheck')

let rightAnswers = document.getElementById('rightAnswers')

practiseBtn.addEventListener('click', function(event) {
    practiseBtn.classList.add('active')
    generatorBtn.classList.remove('active')
    theoryBtn.classList.remove('active')
    prorisovka()
})

generatorBtn.addEventListener('click', function(event) {
    practiseBtn.classList.remove('active')
    theoryBtn.classList.remove('active')
    generatorBtn.classList.add('active')
    prorisovka()
})

theoryBtn.addEventListener('click', function(event) {
    practiseBtn.classList.remove('active')
    theoryBtn.classList.add('active')
    generatorBtn.classList.remove('active')
    prorisovka()
})

function generate(number) {
    container.innerHTML = ''
    for (let i = 1; i <= 10; i++) {
        let table = document.createElement('div')
        table.textContent = `${number} x ${i} = ${i * number}`
        container.appendChild(table)
        container.style.border = '2px solid #776363'
        container.style.padding = '10px'
        container.style.animation = 'start 0.9s ease-out forwards;'
    }
}

let a = 2
let b = 2
let counterMistakes = 3
let c = 0
let d = 2
let e = 2
let schet = 45

function test() {
    counter.style.color = '#9c8065'
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
    checkBtn.style.padding = '10px 20px'

    reshenie.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault()
            checkBtn.click()
        } 
    })
    mainBox.appendChild(topRow)
    mainBox.appendChild(checkBtn)
    primeri.appendChild(mainBox)
    reshenie.focus()
    checkBtn.addEventListener('click', function(event) {
        if (+reshenie.value == a * b) {
            rightCheck.textContent = 'Правильно!'
            rightCheck.style.color = 'yellowgreen'
            reshenie.focus()
            schet -= 1

            b++
            if (b > 10) {
                a++
                b = a
            }
            if (a > 10) {
                rightCheck.textContent = 'Вы прошли всю таблицу!'
                rightCheck.style.color = 'cornflowerblue'
                topRow.innerHTML = ''
                counter.textContent = ''
                mainBox.innerHTML = ''
                a = 2
                b = 2
                counterMistakes = 3
                schet = 45
                startBtn.textContent = 'Начать'
            } else {
                counter.textContent = `Примеров осталось: ${schet}`
                test()
            }
        } else if (reshenie.value == '') {
            rightCheck.textContent = 'Пожалуйста, введите ответ'; rightCheck.style.color = 'yellow'
        } else if (+reshenie.value != a * b && reshenie.value != '') {
            counterMistakes--
            if (counterMistakes == 2) {
                rightCheck.textContent = 'Неверно, осталось 2 попытки'
                rightCheck.style.color = 'crimson'
                reshenie.value = ''
            } else if (counterMistakes == 1) {
                rightCheck.textContent = 'Неверно, последняя попытка'
                rightCheck.style.color = 'crimson'
                reshenie.value = ''
            } else {
                rightCheck.textContent = 'Вы ошиблись слишком много раз. Начнем заново'
                rightCheck.style.color = 'crimson'
                a = 2; b = 2; counterMistakes = 3; schet = 45
                questionText.textContent = `${a} * ${b}`
                test()
            }
        }
    })

    if (b > 2 && !practiseBtn.classList.contains('active') && a <= 10 && b <= 10) {
        startBtn.textContent = 'Продолжить'
    } 
}

function prorisovka() {
    if (practiseBtn.classList.contains('active')) {
        document.querySelector('.generation').style.display = 'none'
        document.querySelector('#theory').style.display = 'none'
        document.querySelector('.practise-mode').style.display = 'block'
        container.innerHTML = ''
        container.style.borderColor = 'white'
    } else if (generatorBtn.classList.contains('active')) {
        document.querySelector('.practise-mode').style.display = 'none'
        document.querySelector('.generation').style.display = 'block'
        document.querySelector('#theory').style.display = 'none'
        primeri.innerHTML = ''
        rightCheck.textContent = ''
    } else if (theoryBtn.classList.contains('active')) {
        document.querySelector('#theory').style.display = 'block'
        document.querySelector('.generation').style.display = 'none'
        document.querySelector('.practise-mode').style.display = 'none'
        container.innerHTML = ''
        container.style.borderColor = 'white'
        primeri.innerHTML = ''
        rightCheck.textContent = ''
    }
    if (b > 2 && !practiseBtn.classList.contains('active') && a <= 10 && b <= 10) {
        startBtn.textContent = 'Продолжить'
    }
} 

prorisovka()

generateBtn.addEventListener('click', function(event) {
    if (numInput.value == '') {alert('Выберите число от 1 до 10')} else if (numInput.value.length > 5) {
        alert('Ошибка: слишком длинное число')
        numInput.value = ''
    } else {
        generate(numInput.value) }
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
    event.target.style.border = '1px solid #c4945c'
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
    test()
})
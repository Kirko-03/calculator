let firstNum = ''
let secNum = ''
let action = ''
let equal = false

const arrayNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const arrayAction = ['-', '+', 'x', '÷', '^', '√', '%']
let listResults = localStorage.getItem('array') ? JSON.parse(localStorage.getItem('array')) : []
localStorage.setItem('array', JSON.stringify(listResults))
const screen = document.querySelector(".panel input")
const ul = document.querySelector('ul')

const liMaker = text => {
    listResults.length === 100 && listResults.shift()
    const li = document.createElement('li')
    ul.prepend(li)
    li.textContent = text
}
listResults.map(item => {
    liMaker(item)
})

function allClear() {
    firstNum = ''
    secNum = ''
    action = ''
    equal = false
    screen.value = null
}

document.querySelector('.clear').onclick = allClear
document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains("btn")) return
    if (event.target.classList.contains("clear")) return
    screen.textContent = ''
    const key = event.target.textContent;
    if (arrayNumber.includes(key)) {
        if (secNum === '' && action === '') {
            firstNum += key
            screen.value += key

        } else if (firstNum !== '' && secNum !== '' && equal) {
            secNum = ''
            secNum += key
            equal = false
            screen.value += key
        } else {
            secNum += key
            screen.value += key
        }
        return;
    }
    if (arrayAction.includes(key)) {
        action = key
        console.log(firstNum, secNum, action)
        screen.value += action
    }

    if (key === '=') {
        if (secNum === '') secNum = firstNum

        switch (action) {
            case '+':
                localStorage.setItem('screen', '' + firstNum + '+' + secNum + '=' + (Number(firstNum) + Number(secNum)))
                firstNum = Number(firstNum) + Number(secNum)

                break;
            case '-':
                localStorage.setItem('screen', '' + firstNum + '-' + secNum + '=' + (Number(firstNum) - Number(secNum)))
                firstNum = Number(firstNum) - Number(secNum)
                break;
            case 'x':
                localStorage.setItem('screen', '' + firstNum + '*' + secNum + '=' + (Number(firstNum) * Number(secNum)))
                firstNum = Number(firstNum) * Number(secNum)
                break;
            case '÷':
                localStorage.setItem('screen', '' + firstNum + '÷' + secNum + '=' + (Number(firstNum) / Number(secNum)))
                firstNum = Number(firstNum) / Number(secNum)
                break;
            case '^':
                localStorage.setItem('screen', '' + firstNum + '^' + secNum + '=' + (Math.pow(Number(firstNum), Number(secNum))))
                firstNum = Math.pow(Number(firstNum), Number(secNum))
                break;
            case '√':
                if(firstNum!==''){
                    secNum=firstNum
                }
                localStorage.setItem('screen', '√' + secNum + '=' + (Math.sqrt(Number(secNum))))
                secNum = Math.sqrt(Number(secNum))
                firstNum=secNum
                secNum = ''
                break;
            case '%':
                localStorage.setItem('screen', '' + firstNum + '%' + secNum + '=' + (Number(firstNum) % Number(secNum)))
                firstNum = Number(firstNum) % Number(secNum)
                break;

        }

        let value = localStorage.getItem('screen')
        listResults.push(value)
        localStorage.setItem('array', JSON.stringify(listResults))
        liMaker(value)
        equal = true
        screen.value = firstNum
    }
}
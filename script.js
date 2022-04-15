const resultElement = document.getElementById('result')
const lengthElement = document.getElementById('length')
const uppercaseElement = document.getElementById('uppercase')
const lowercaseElement = document.getElementById('lowercase')
const numbersElement = document.getElementById('numbers')
const symbolsElement = document.getElementById('symbols')
const generateElement = document.getElementById('generate')
const clipboardElement = document.getElementById('clipboard')


const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

generateElement.addEventListener('click', () => {
    const length = +lengthElement.value
    const hasLower = lowercaseElement.checked
    const hasUpper = uppercaseElement.checked
    const hasNumber = numbersElement.checked
    const hasSymbol = symbolsElement.checked

    resultElement.innerText = generatePassword(length, hasLower, hasNumber, hasUpper, hasSymbol);
})

//copy pw to clipboard
clipboardElement.addEventListener('click', () => {
    const textArea = document.createElement('textarea')
    const password = resultElement.innerText

    if (!password) { return }

    textArea.value = password
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
    alert('Password copied to clipboard')
})


function generatePassword(length, lower, number, upper, symbol) {
    let password = ''

    //filter unchecked types
    const typesCount = lower + upper + number + symbol

    if (typesCount === 0) return ''

    const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0])

    //loop over length, call generator function for each type
    for (let i = 0; i < length; i += typesCount) {
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0]
            password += randomFunction[funcName]()
        })
    }

    return password.slice(0, length)
}

//Generator functions
function getRandomLower() { //97 - 122
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}
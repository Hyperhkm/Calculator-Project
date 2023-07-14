const numbers = document.querySelectorAll('.number');
const operator = document.querySelectorAll('.operator');
const display = document.querySelector('#display');
const acButton = document.querySelector('#ac');
const equalButton = document.querySelector('#equals');
const dotButton = document.querySelector('#dot');

let result = 0,
    operation = 0,
    displayNumber = 0;

acButton.onclick = () => clearEvent();

function clearEvent() {
    result = 0;
    operation = 0;
    displayNumber = 0;
    display.innerHTML = result;
}

document.addEventListener('DOMContentLoaded', function() {
    numbers.forEach(number => {
        number.addEventListener('click', function() {
            displayNumber += `${number.innerHTML}`;
            displayNumber = Number(displayNumber);
            display.innerHTML = displayNumber;
        })
    })
    operator.forEach(operator => {
        operator.addEventListener('click', function() {
            if(!Number(displayNumber)) {return}
            if(eval(`${operation}${displayNumber}`) && operation !== 0) {
                result = eval(`${operation}${displayNumber}`);
                displayNumber = result;
                display.innerHTML = result;
            }
            operation = `${displayNumber}`;
            operation += `${operator.innerHTML}`;
            displayNumber = 0;
        })
    })
    equalButton.addEventListener('click', function() {
        if (!eval(`${operation}${displayNumber}`)) {return}
        result = eval(`${operation}${displayNumber}`);
        display.innerHTML = result;
    })
    dotButton.addEventListener('click', function(){
        if(!Number(displayNumber) || displayNumber.toString().split('').indexOf('.') > -1) {return}
        displayNumber += '.';
        display.innerHTML = displayNumber;
    })
})
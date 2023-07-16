const numbers = document.querySelectorAll('.number');
const operator = document.querySelectorAll('.operator');
const display = document.querySelector('#display');
const acButton = document.querySelector('#ac');
const equalButton = document.querySelector('#equals');
const dotButton = document.querySelector('#dot');
const signButton = document.querySelector('#sign');
const porcButton = document.querySelector('#porc');

let result = 0,
    operation = 0,
    displayNumber = 0;
    clear = function () {
        result = 0;
        operation = 0;
        displayNumber = 0;
    };

acButton.onclick = () => clearEvent();

function clearEvent() {
    clear();
    display.innerHTML = 0;
};
function check (e) {
    return displayNumber.toString().split('').indexOf(e)
};
function checkOp (e, operation) {
    return operation.toString().split('').indexOf(e)
};
function returnOnlyNum (num) {
    let regex = /[0-9]/g;
    operation = num.match(regex).join('');
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
            if(eval(`${operation+displayNumber}`) && operation !== 0) {
                result = eval(`${operation+displayNumber}`);
                displayNumber = result;
                display.innerHTML = result;
            }
            operation = `${displayNumber}`;
            operation += `${operator.innerHTML}`;
            displayNumber = 0;
        })
    })
    equalButton.addEventListener('click', function() {
        if (!eval(`${operation+displayNumber}`)) {return}
        result = eval(`${operation+displayNumber}`);
        display.innerHTML = result;
        clear();
    })
    dotButton.addEventListener('click', function(){
        if(!Number(displayNumber) || check('.') > -1) {return}
        displayNumber += '.';
        display.innerHTML = displayNumber;
    })
    signButton.addEventListener('click', function(){
        if(displayNumber == 0) {return};
        if(check('-') > -1) {
            displayNumber = Number(displayNumber.toString().split('').slice(1).join('')); return display.innerHTML = displayNumber;
        }
        (() => {
            let newNumber = displayNumber;
            newNumber = displayNumber.toString().split('');
            newNumber.unshift('-');
            displayNumber = Number(newNumber.join(''));
        })();
        display.innerHTML = displayNumber;
    })
    porcButton.addEventListener('click', function() {
        switch(true){
            case checkOp('+', operation) > -1:
                returnOnlyNum(operation);
                display.innerHTML = operation*(1+displayNumber/100);
                clear();
                break;
            case checkOp('-', operation) > -1:
                returnOnlyNum(operation);
                display.innerHTML = operation*(1-displayNumber/100);
                clear();
                break;
            case checkOp('/', operation) > -1:
                returnOnlyNum(operation);
                display.innerHTML = operation/(displayNumber/100);
                clear();
                break;
            case checkOp('*', operation) > -1:
                returnOnlyNum(operation);
                display.innerHTML = operation/(displayNumber/100);
                clear();
                break;
        }
    })
})
const add = (a,b) => parseInt(a) + parseInt(b);
//console.log(add(2,3));
const subtract = (a,b) => parseInt(a) - parseInt(b);
//console.log(subtract(2,3));
const multiply = (a,b) => parseInt(a) * parseInt(b);
//console.log(multiply(2,3));
const divide = (a,b) => parseInt(a) / parseInt(b);
//console.log(divide(2,3)); 
const modulo = (a,b) => parseInt(a) % parseInt(b);

const operate = (lOperand , rOperand , operator) => {
    switch(operator) {
        case '+' :
            return add(lOperand , rOperand);
            break;
        case '-' :
            return subtract(lOperand , rOperand);
            break;
        case '÷' :
            return divide(lOperand , rOperand);
            break;
        case 'x' :
            return multiply(lOperand , rOperand);
            break;
        case '%' :
            return modulo(lOperand , rOperand);
    }
};

const buttonNumbers = document.querySelectorAll(".num");
const display = document.querySelector('#content-container');
const operator = document.querySelectorAll('.operator');
const operators = document.querySelectorAll('.operators');
const operands = document.querySelector('#result-container');
let var1 = '';
let var2 = '';
let operatorApply = '';

operator.forEach((button) => {
    button.addEventListener('click' , (e) => {
        if (display.textContent === '') {
            return;
        }
        if (button.textContent === 'AC') {
            display.textContent = '0';
            var1 = '';
            var2 = '';
            operatorApply = '';
        }
        if (button.textContent === '1/x') {
            //result = display.textContent.slice(display.textContent.length - 1, display.textContent.length);
            let l;
            if(var2 === '') {
                result = Number(var1,10);
                l = var1.length;
            } else {
                result = Number(var2,10);
                l = var2.length;
            }
            console.log(result);
            result = 1 / result;
            //console.log(result);
            display.textContent = display.textContent.slice(0, display.textContent.length - l);
            display.textContent += result;
            if(var2 === '')
                var1 = `${result}`;
            else
                var2 = `${result}`;
        }
        if (button.textContent === '√') {
            let l;
            if(var2 === '') {
                l = var1.length;
                result = Number(var1,10);
            } else {
                l = var2.length;
                result = Number(var2,10);
            }
            console.log(result);
            result = Math.sqrt(result);
            if(isNaN(result)) {
                display.textContent = 'ERROR';
                var1 = '';
                var2 = '';
                operatorApply = '';
                return;
            }
            display.textContent = display.textContent.slice(0, display.textContent.length - l);
            display.textContent += result;
            if(var2 === '')
                var1 = `${result}`;
            else
                var2 = `${result}`;
        }
    });
});

buttonNumbers.forEach((button) => {
    button.addEventListener('click',(e) => {
        if(display.textContent.length < 20) {
            if(display.textContent !== '0') {
                display.textContent += button.textContent;
            } else {
                operands.textContent = '';
                display.textContent = button.textContent;
                //operatorApply = '';
            }
            if(operatorApply === ''){
                var1 += button.textContent;
                operands.textContent += button.textContent;
            } else {
                if(var2 === '')
                    operands.textContent = button.textContent;
                else
                    operands.textContent += button.textContent;
                var2 += button.textContent;
            }
        }
    });
});

operators.forEach((button) => {
    button.addEventListener('click' , (e) => {
        if(button.textContent !== '=' && display.textContent.length < 20) {
            if(button.textContent === '-' && display.textContent === '0') {
                display.textContent = '-';
                var1 = '-';
                return;
            }
            if(button.textContent === '+' && display.textContent === '0') {
                return;
            }
            if(var2 !== '') {
                var1 = operate(var1 , var2 , operatorApply);
                display.textContent = var1;
                //operands.textContent = var1;
                var2 = '';
                operands.textContent = '0';
            } else {
                operands.textContent = '0';
            }
            operatorApply = button.textContent;
            display.textContent += button.textContent;
            return;
        }
        if(button.textContent === '=') {
            var1 = operate(var1 , var2 , operatorApply);
            display.textContent = `${var1}`;
            //var1 = '';
            var2 = '';
            operatorApply = '';
            operands.textContent = var1;
            return;
        }
    });
});

//console.log(btnNumbers,display,operator,operators);

//console.log(operate(5,4,'%'));
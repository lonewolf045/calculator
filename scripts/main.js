const add = (a, b) => (parseFloat(a) + parseFloat(b)).toFixed(4);
//console.log(add(2,3));
const subtract = (a, b) => (parseFloat(a) - parseFloat(b)).toFixed(4);
//console.log(subtract(2,3));
const multiply = (a, b) => (parseFloat(a) * parseFloat(b)).toFixed(4);
//console.log(multiply(2,3));
const divide = (a, b) => (parseFloat(a) / parseFloat(b)).toFixed(4);
//console.log(divide(2,3)); 
const modulo = (a, b) => (parseFloat(a) % parseFloat(b)).toFixed(4);

const operate = (lOperand, rOperand, operator) => {
    switch (operator) {
        case '+':
            return add(lOperand, rOperand);
            break;
        case '-':
            return subtract(lOperand, rOperand);
            break;
        case '÷':
            return divide(lOperand, rOperand);
            break;
        case 'x':
            return multiply(lOperand, rOperand);
            break;
        case '%':
            return modulo(lOperand, rOperand);
    }
};

const priority = {
    '÷': 1,
    'x': 2,
    '+': 3,
    '-': 4
};

const buttonNumbers = document.querySelectorAll(".num");
const display = document.querySelector('#content-container');
const operator = document.querySelectorAll('.operator');
const operators = document.querySelectorAll('.operators');
const operands = document.querySelector('#result-container');
const dot = document.querySelector('#dot');
let var1 = '';
let var2 = '';
let operatorApply = '';
let expressionString = '';
let varNew = '';
let expressionNew = '';

operator.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (display.textContent === '') {
            return;
        }
        if (button.textContent === 'AC') {
            display.textContent = '0';
            var1 = '';
            var2 = '';
            operatorApply = '';
            dot.disabled = false;
            operands.textContent = '0';
            expressionString = '';
            expressionNew = '';
            varNew = '';
        }
        if (button.textContent === '1/x') {
            //result = display.textContent.slice(display.textContent.length - 1, display.textContent.length);
            let l;
            if (var2 === '') {
                result = Number(var1, 10);
                l = var1.length;
            } else {
                result = Number(var2, 10);
                l = var2.length;
            }
            console.log(result);
            result = (1 / result).toFixed(4);
            //console.log(result);
            /*display.textContent = display.textContent.slice(0, display.textContent.length - l);
            display.textContent += result;*/
            if (var2 === '')
                var1 = `${result}`;
            else
                var2 = `${result}`;
            result = Number(varNew,10);
            result = (1 / result).toFixed(4);
            varNew = `${result}`;
            operands.textContent = varNew;
            display.textContent = display.textContent.slice(0, display.textContent.length - l);
            display.textContent += result;
        }
        if (button.textContent === '√') {
            let l;
            if (var2 === '') {
                l = var1.length;
                result = Number(var1, 10);
            } else {
                l = var2.length;
                result = Number(var2, 10);
            }
            console.log(result);
            result = Math.sqrt(result).toFixed(4);
            if (isNaN(result)) {
                display.textContent = 'ERROR';
                var1 = '';
                var2 = '';
                operatorApply = '';
                return;
            }
            display.textContent = display.textContent.slice(0, display.textContent.length - l);
            display.textContent += result;
            if (var2 === '')
                var1 = `${result}`;
            else
                var2 = `${result}`;
            result = Number(varNew,10);
            result = Math.sqrt(result).toFixed(4);   
            varNew = `${result}`; 
            operands.textContent = varNew;
            display.textContent = expressionNew;
            operands.textContent = varNew;
            display.textContent = display.textContent.slice(0, display.textContent.length - l);
            display.textContent += result;
        }
    });
});

buttonNumbers.forEach((button) => {
    button.addEventListener('click', (e) => {
        //if (display.textContent.length < 40) {
            console.log('Clicked');
            if (display.textContent !== '0') {
                //display.textContent += button.textContent;
            } else {
                operands.textContent = '';
                display.textContent = '';
                //operatorApply = '';
            }
            if (operatorApply === '') {
                var1 += button.textContent;
                if (/./.test(var1) && button.textContent === '.')
                    button.disabled = true;
                operands.textContent += button.textContent;
            } else {
                if (var2 === '') {
                    operands.textContent = button.textContent;
                }
                else
                    operands.textContent += button.textContent;
                var2 += button.textContent;
                if (/./.test(var1) && button.textContent === '.')
                    button.disabled = true;
            }
            varNew += button.textContent;
        //}
        expressionString += button.textContent;
        display.textContent += button.textContent;
    });
});

operators.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (button.textContent !== '=' /*&& display.textContent.length < 40*/) {
            if (button.textContent === '-' && display.textContent === '0') {
                display.textContent = '-';
                var1 = '-';
                varNew = '-';
                expressionString += button.textContent;
                return;
            }
            if (button.textContent === '+' && display.textContent === '0') {
                return;
            }
            if (var2 !== '') {
                expressionNew += varNew;
                varNew = '';
                var1 = operate(var1, var2, operatorApply);
                if(var1 == 'Infinity') {
                    display.textContent = 'ERROR!';
                    operands.textContent = 'ERROR!';
                } else {
                    //display.textContent = var1;
                    operands.textContent = '0';
                    console.log(var1);
                }
                //operands.textContent = var1;
                var2 = '';
            } else {
                expressionNew += varNew;
                varNew = '';
                operands.textContent = '0';
            }
            operatorApply = button.textContent;
            display.textContent += ' ' + button.textContent + ' ';
            dot.disabled = false;
            expressionString += ' ' + button.textContent + ' ';
            expressionNew += ' ' + button.textContent + ' ';
            return;
        }
        if (button.textContent === '=') {
            if(var2 === '') {
                return;
            }
            expressionNew += varNew;
            var1 = compute.computeExpression(expressionNew);
            varNew = var1;
            expressionNew = '';
            if(var1 == 'Infinity') {
                display.textContent = 'ERROR!';
                operands.textContent = 'ERROR!';
            } else {
                display.textContent = var1;
                operands.textContent = var1;
                console.log(var1);
            }
            var1 = '';
            var2 = '';
            operatorApply = '';
            return;
        }
    });
});

/*operators.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (button.textContent === '=') {
            if(var2 === '') {
                return;
            }
            expressionNew += varNew;
            var1 = compute.computeExpression(expressionNew);
            varNew = var1;
            expressionNew = '';
            if(var1 == 'Infinity') {
                display.textContent = 'ERROR!';
                operands.textContent = 'ERROR!';
            } else {
                display.textContent = var1;
                operands.textContent = var1;
                console.log(var1);
            }
            var1 = '';
            var2 = '';
            operatorApply = '';
            return;
        }
    });
});*/
console.log(dot);

let pressed = 0;

window.addEventListener('keypress',(e) => {
    console.log(e)
    if(e.key <= '9' && e.key >= '0' || e.key == '.') {
        console.log('Clicked',e.key);
        if(e.key == '.' && pressed === 0) {
            pressed = 1;
            operands.textContent += e.key;
            varNew += e.key;
            expressionString += e.key;
            display.textContent += e.key;
        } else if(e.key == '.' && pressed === 1) {
            return;
        } else {
            if (display.textContent !== '0') {
                //display.textContent += button.textContent;
            } else {
                operands.textContent = '';
                display.textContent = '';
                //operatorApply = '';
            }
            if (operatorApply === '') {
                //var1 += button.textContent;
                var1 += e.key;
                operands.textContent += e.key;
                //if (/./.test(var1) && e.key === '.'&& pressed === 0) {
                    //pressed = 1;
                    //operands.textContent += button.textContent;
                    //operands.textContent += e.key;
            } else {
                if (var2 === '') {
                    //operands.textContent = button.textContent;
                    operands.textContent = e.key;
                } else {
                    //operands.textContent += button.textContent;
                    operands.textContent += e.key;
                }
                var2 += e.key;
                    //if (/./.test(var1) && e.key === '.')
                        //button.disabled = true;
                }
            varNew += e.key;
                //}
            expressionString += e.key;
            display.textContent += e.key;
        }
    } else if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/' || e.key == '=') {
        if (e.key !== '=') {
            if (e.key === '-' && display.textContent === '0') {
                display.textContent = '-';
                var1 = '-';
                varNew = '-';
                expressionString += e.key;
                return;
            }
            if (e.key === '+' && display.textContent === '0') {
                return;
            }
            if (var2 !== '') {
                expressionNew += varNew;
                varNew = '';
                var1 = operate(var1, var2, operatorApply);
                if(var1 == 'Infinity') {
                    display.textContent = 'ERROR!';
                    operands.textContent = 'ERROR!';
                } else {
                    //display.textContent = var1;
                    operands.textContent = '0';
                    console.log(var1);
                }
                //operands.textContent = var1;
                var2 = '';
            } else {
                expressionNew += varNew;
                varNew = '';
                operands.textContent = '0';
            }
            if(e.key === '*') {
                operatorApply = 'x';
                display.textContent += '  x ';
                pressed = 0;
                expressionString += ' x ';
                expressionNew += ' x ';
            } else if (e.key === '/') {
                operatorApply = '÷';
                display.textContent += '  ÷ ';
                pressed = 0;
                expressionString += ' ÷ ';
                expressionNew += ' ÷ ';
            } else {
                operatorApply = e.key;
                display.textContent += ` ${e.key} `;
                pressed = 0;
                expressionString += ` ${e.key} `;
                expressionNew += ` ${e.key} `;
            }
            return;
        }
        if (e.key === '=') {
            if(var2 === '') {
                return;
            }
            expressionNew += varNew;
            var1 = compute.computeExpression(expressionNew);
            varNew = var1;
            expressionNew = '';
            if(var1 == 'Infinity') {
                display.textContent = 'ERROR!';
                operands.textContent = 'ERROR!';
            } else {
                display.textContent = var1;
                operands.textContent = var1;
                console.log(var1);
            }
            var1 = '';
            var2 = '';
            operatorApply = '';
            return;
        }
    } 
});
window.addEventListener('keydown',(e) => {
    //console.log(e);
    if (e.key === 'Backspace') {
        console.log('clicked',e.key,e.shiftKey);
        if(e.shiftKey === true) {
            console.log('AC activated');
            display.textContent = '0';
            var1 = '';
            var2 = '';
            operatorApply = '';
            dot.disabled = false;
            operands.textContent = '0';
            expressionString = '';
            expressionNew = '';
            varNew = '';
        }
    }
});

const compute = (() => {
    const parseDivisionSeparatedExpression = (expression) => {
        const numbersString = expression.split('÷');
        const numbers = numbersString.map(noStr => +noStr);
        const initialValue = numbers[0];
        console.log(numbers);
        const result = numbers.reduce((acc, no) => acc / no);
        console.log(result);
        return result;
    };

    const parseMultiplicationSeparatedExpression = (expression) => {
        const numbersString = expression.split('x');
        const numbers = numbersString.map(noStr => parseDivisionSeparatedExpression(noStr));
        const initialValue = 1.0;
        const result = numbers.reduce((acc, no) => acc * no, initialValue);
        console.log(result);
        return result;
    };
    
    // both * -
    const parseMinusSeparatedExpression = (expression) => {
        const numbersString = expression.split('-');
        const numbers = numbersString.map(noStr => parseMultiplicationSeparatedExpression(noStr));
        const initialValue = numbers[0];
        const result = numbers.slice(1).reduce((acc, no) => acc - no, initialValue);
        console.log(result);
        return result;
    };
    
    // * - + 
    const parsePlusSeparatedExpression = (expression) => {
        const numbersString = expression.split('+');
        const numbers = numbersString.map(noStr => parseMinusSeparatedExpression(noStr));
        const initialValue = 0.0;
        const result = numbers.reduce((acc, no) => acc + no, initialValue);
        console.log(result);
        return result;
    };

    const computeExpression = (expression) => {
        return parsePlusSeparatedExpression(expression);
    };
    return {computeExpression,parsePlusSeparatedExpression};
})();

console.log(compute.computeExpression(expressionString));

//console.log(btnNumbers,display,operator,operators);

//console.log(operate(5,4,'%'));
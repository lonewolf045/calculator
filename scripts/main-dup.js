const add = (a, b) => parseFloat(a) + parseFloat(b);
//console.log(add(2,3));
const subtract = (a, b) => parseFloat(a) - parseFloat(b);
//console.log(subtract(2,3));
const multiply = (a, b) => parseFloat(a) * parseFloat(b);
//console.log(multiply(2,3));
const divide = (a, b) => parseFloat(a) / parseFloat(b);
//console.log(divide(2,3)); 
const modulo = (a, b) => parseFloat(a) % parseFloat(b);

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
            result = 1 / result;
            //console.log(result);
            display.textContent = display.textContent.slice(0, display.textContent.length - l);
            display.textContent += result;
            if (var2 === '')
                var1 = `${result}`;
            else
                var2 = `${result}`;
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
            result = Math.sqrt(result);
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
        }
    });
});

buttonNumbers.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (display.textContent.length < 20) {
            if (display.textContent !== '0') {
                display.textContent += button.textContent;
            } else {
                operands.textContent = '';
                display.textContent = button.textContent;
                //operatorApply = '';
            }
            if (operatorApply === '') {
                var1 += button.textContent;
                if (/./.test(var1) && button.textContent === '.')
                    button.disabled = true;
                operands.textContent += button.textContent;
            } else {
                if (var2 === '')
                    operands.textContent = button.textContent;
                else
                    operands.textContent += button.textContent;
                var2 += button.textContent;
                if (/./.test(var1) && button.textContent === '.')
                    button.disabled = true;
            }
        }
        expressionString += button.textContent;
    });
});

operators.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (button.textContent !== '=' && display.textContent.length < 20) {
            if (button.textContent === '-' && display.textContent === '0') {
                display.textContent = '-';
                var1 = '-';
                return;
            }
            if (button.textContent === '+' && display.textContent === '0') {
                return;
            }
            if (var2 !== '') {
                var1 = operate(var1, var2, operatorApply);
                if(var1 == 'Infinity') {
                    display.textContent = 'ERROR!';
                    operands.textContent = 'ERROR!';
                } else {
                    display.textContent = var1;
                    operands.textContent = '0';
                    console.log(var1);
                }
                //operands.textContent = var1;
                var2 = '';
            } else {
                operands.textContent = '0';
            }
            operatorApply = button.textContent;
            display.textContent += button.textContent;
            dot.disabled = false;
            expressionString += button.textContent;
            return;
        }
        if (button.textContent === '=') {
            if(var2 === '') {
                return;
            }
            var1 = operate(var1, var2, operatorApply);
            if(var1 == 'Infinity') {
                display.textContent = 'ERROR!';
                operands.textContent = 'ERROR!';
            } else {
                display.textContent = var1;
                operands.textContent = var1;
                console.log(var1);
            }
            //var1 = '';
            var2 = '';
            operatorApply = '';
            return;
        }
    });
});

operators.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (button.textContent === '=') {
            if(var2 === '') {
                return;
            }
            var1 = operate(var1, var2, operatorApply);
            if(var1 == 'Infinity') {
                display.textContent = 'ERROR!';
                operands.textContent = 'ERROR!';
            } else {
                display.textContent = var1;
                operands.textContent = var1;
                console.log(var1);
            }
            //var1 = '';
            var2 = '';
            operatorApply = '';
            return;
        }
    });
});
console.log(dot);

const compute = (() => {
    const parsePlusSeparatedExpression = (expression) => {
        // lets say expression = 123 + 58 + 49
        const numbersString = expression.split('+'); // ["123", "58", "49"]
          
            // convert string to number, you may also use parseInt for readability
        const numbers = numbersString.map(noStr => +noStr); // [123, 58, 49]
        const initialValue = 0.0;
            // accumulate all values
        const result = numbers.reduce((acc, no) => acc + no, initialValue);
        return result;
    };

    return {parsePlusSeparatedExpression};
})();

//console.log(btnNumbers,display,operator,operators);

//console.log(operate(5,4,'%'));

const postfixMaker = ((doc) => {
    const parsePlusSeparatedExpression = (expression) => {
        // lets say expression = 123 + 58 + 49
        const numbersString = expression.split('+'); // ["123", "58", "49"]
          
            // convert string to number, you may also use parseInt for readability
        const numbers = numbersString.map(noStr => +noStr); // [123, 58, 49]
        const initialValue = 0.0;
            // accumulate all values
        const result = numbers.reduce((acc, no) => acc + no, initialValue);
        return result;
    };
})(document);
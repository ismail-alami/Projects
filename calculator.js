document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.innerText;

            if (value >= '0' && value <= '9' || value === '.') {
                currentInput += value;
                display.innerText = currentInput;
            } else if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.innerText = '0';
            } else if (value === '=') {
                if (currentInput && previousInput && operator) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.innerText = currentInput;
                    previousInput = '';
                    operator = '';
                }
            } else {
                if (currentInput) {
                    if (previousInput) {
                        currentInput = calculate(previousInput, currentInput, operator);
                        display.innerText = currentInput;
                    }
                    previousInput = currentInput;
                    currentInput = '';
                    operator = value;
                }
            }
        });
    });

    function calculate(a, b, operator) {
        let result;
        a = parseFloat(a);
        b = parseFloat(b);

        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                result = a / b;
                break;
            default:
                result = 0;
        }

        return result.toString();
    }
});

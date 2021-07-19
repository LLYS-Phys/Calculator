const calc = {
	displayValue: '0',
	firstOperand: null,
	waitingForSecondOperand: false,
	operator: null,
};

function inputDigit(digit) {
	const { displayValue, waitingForSecondOperand } = calc;
	if (waitingForSecondOperand === true) {
	  calc.displayValue = digit;
	  calc.waitingForSecondOperand = false;
	} 
	else {
	  calc.displayValue = displayValue === '0' ? digit : displayValue + digit;
	}
	if (displayValue.length>11){
		alert("Your numbers are too big")
	}
}
  
function inputDecimal(dot) {
	if (calc.waitingForSecondOperand === true) {
		calc.displayValue = '0.'
	  	calc.waitingForSecondOperand = false;
	  	return
	}
	if (!calc.displayValue.includes(dot)) {
	  	calc.displayValue += dot;
	}
}
  
function handleOperator(nextOperator) {
	const { firstOperand, displayValue, operator } = calc
	const inputValue = parseFloat(displayValue);
  
	if (operator && calc.waitingForSecondOperand)  {
		calc.operator = nextOperator;
		return;
	}

	if (firstOperand == null && !isNaN(inputValue)) {
	  	calc.firstOperand = inputValue;
  
	} 
	else if (operator) {
	  	const result = calculate(firstOperand, inputValue, operator);
	  	calc.displayValue = `${parseFloat(result.toFixed(7))}`;
	  	calc.firstOperand = result;
	}
	calc.waitingForSecondOperand = true;
	calc.operator = nextOperator;
	console.log(calc);
}
  
function calculate(firstOperand, secondOperand, operator) {
	if (operator === '+') {
	  	return firstOperand + secondOperand;
	} 
	else if (operator === '-') {
	  	return firstOperand - secondOperand;
	} 
	else if (operator === '*') {
	  	return firstOperand * secondOperand;
	} 
	else if (operator === '/') {
	  	return firstOperand / secondOperand;
	}
	return secondOperand;
  }

function resetCalc() {
	calc.displayValue = '0';
	calc.firstOperand = null;
	calc.waitingForSecondOperand = false;
	calc.operator = null;
}

function cEntry(){
	calc.displayValue = '0';
	calc.waitingForSecondOperand = true;
}
  
function updateDisplay() {
	const display = document.querySelector('.calc-screen');
	display.value = calc.displayValue;
}
  
updateDisplay();
  
const keys = document.querySelector('.keyboard');
  
keys.addEventListener('click', event => {
	const { target } = event;
	const { value } = target;
	if (!target.matches('button')) {
	  return;
	}
  
	switch (value) {
	  	case '+':
	  	case '-':
	  	case '*':
	  	case '/':
	  	case '=':
			handleOperator(value);
			break;
	  	case '.':
			inputDecimal(value);
			break;
		case 'clearEntry':
			cEntry();
			break
	  	case 'clearAll':
			resetCalc();
			break;
	  	default:
			if (Number.isInteger(parseFloat(value))) {
		  		inputDigit(value);
			}
	}
  
	updateDisplay();
});
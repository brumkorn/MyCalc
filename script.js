// Get all the keys from document
var keys = document.querySelectorAll('.keys span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;
var beenEvaluated = false;


// Add onclick event and perform operations
for(var i = 0; i < keys.length; i++) {
	
	keys[i].onclick = function(e) {
		// Get the input and button values
		var input = document.querySelector('.screenBot');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;
		
		
		// Implement keys functions
		
		/*************
		Functional keys
		**************/
		
		// Clear all button
		var clear = function() {
			input.innerHTML = "0";
			decimalAdded = false;
			beenEvaluated = false;
		};
		//reverse sign button
		var reverse = function() {
			input.innerHTML = inputVal * -1;
		};
		//erase button
		var erase = function() {
			if (!beenEvaluated) {
				if(inputVal.length > 1) {
				input.innerHTML = inputVal.replace(/.$/, '');
				}
				else {
					input.innerHTML = "0";
				}
			}
		};
		// Evaluation button
		var evaluate = function() {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];
			
			// replace with right source operators
			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
			
			// check and remove last char it if it's an operator
			if(operators.indexOf(lastChar) > -1) {
				equation = equation + equation.replace(/.$/, '');
			}
			
			if(lastChar === '.') {
				equation = equation.replace(/.$/, '');
			}
			
			if(equation) {
				input.innerHTML = eval(equation);
				beenEvaluated = true;
			}
			
		};
		
		/*************
		Formula keys
		**************/
		
		var percentage = function() {
			
		};
		
		var squareRoot = function() {
			
		};
		
		var powerOfTwo = function() {
			/*
			1.Получаю данные с экрана.
			2.Нахожу крайнюю цифру перед знаком и вырезаю все число до этой цифры.
				
			3.Умножаю полуившееся число само на себя.
			4.Добавляю получившееся произведение к уравнению на экране.
			
			*/
			var equation = inputVal;
			var numToSquare = 0;
			
			
		};
		
		var fractionOne = function() {
			
		};
		
		
		/*************
		Logic functions
		**************/
		
		//operators logic fix
		var operateFix = function() {
			// Get the last character from the equation
			var lastChar = inputVal[inputVal.length - 1];
			// Only add operator if input is not empty and there is no operator at the last
			if(inputVal !== ''  && operators.indexOf(lastChar) === -1) 
				input.innerHTML += btnVal;
			// Allow minus if the string is empty
			else if(inputVal === '' && btnVal === '-') 
				input.innerHTML += btnVal;
			// Replace the last operator (if exists) with the newly pressed operator
			if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}
			decimalAdded = false;
			beenEvaluated = false;
		};
		// prevent multi decimals
		var decimalIndicator = function() {
			if(!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		};
		//keys append, initial zero fix
		var appending = function() {
			if(inputVal === "0" || beenEvaluated) {
			input.innerHTML = btnVal;
			beenEvaluated = false;
			}
			else if(!beenEvaluated)
			input.innerHTML += btnVal;
		};
		
		
		
		if(btnVal === 'C') {
			clear();
		}
		else if(btnVal === "\u00B1") {
			reverse();
		}
		else if(btnVal === "\u232B") {
			erase();
		}
		else if(btnVal === '=') {
			evaluate();
		}
		else if(operators.indexOf(btnVal) > -1) {
			operateFix();
		}
		else if(btnVal === '.') {
			decimalIndicator();
		}
		else {
			appending();
		}
		
	} 
}
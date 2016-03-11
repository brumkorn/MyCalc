// Get all the keys from document
var keys = document.querySelectorAll('.keys span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;


// Add onclick event to all the keys and perform operations
for(var i = 0; i < keys.length; i++) {
	
	keys[i].onclick = function(e) {
		// Get the input and button values
		var input = document.querySelector('.screenBot');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;
		
		
		// Implement keys functions
		// Clear all button
		if(btnVal === 'C') {
			input.innerHTML = '0';
			decimalAdded = false;
		}
		
		//reverse sign button
		else if(btnVal === "\u00B1") {
			input.innerHTML = inputVal * -1;
		}
		
		//erase button
		else if(btnVal === "\u232B") {
			var lastChar = inputVal[inputVal.length - 1];
			if(inputVal.length > 1) {
			input.innerHTML = inputVal.replace(/.$/, '');
			}
			else {
				input.innerHTML = "0";
			}
		}
		
		// Evaluation button
		else if(btnVal === '=') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];
			
			// replace with right source operators
			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
			
			// check and remove last char it if it's an operator
			if(operators.indexOf(lastChar) > -1 || lastChar === '.')
				equation = equation.replace(/.$/, '');
			
			if(equation)
				input.innerHTML = eval(equation);
				
			decimalAdded = false;
		}
		
		//operators logic
		else if(operators.indexOf(btnVal) > -1) {
			
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
				// Here, '.' matches any character while $ denotes the end of string, so anything (will be an operator in this case) at the end of string will get replaced by new operator
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}
			
			decimalAdded = false;
		}
		
		// prevent multi decimals
		else if(btnVal === '.') {
			if(!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		}
		
		// append other keys
		else {
			if(inputVal === "0") {
			input.innerHTML = "";
			}
			input.innerHTML += btnVal;
			
		}
		
	} 
}
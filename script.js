// Get all the keys from document
var keys = document.querySelectorAll('.keys span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;
var beenEvaluated = false;


// Add onclick event and perform operations
for(var i = 0; i < keys.length; i++) {
	
	keys[i].onclick = function(e) {
		// Get the input and button values
		var input = document.querySelector('.screenBot'),
			inputVal = input.innerHTML,
			btnVal = this.innerHTML;
		
		
		// Implement keys functions
		
		/*************
		Functional keys
		**************/
		
		// Clear all button
		function clear() {
			input.innerHTML = "0";
			decimalAdded = false;
			beenEvaluated = false;
		};
		//reverse sign button
		function reverse() {
			input.innerHTML = inputVal * -1;
		};
		//erase button
		function erase() {
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
		function evaluate() {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];
			
			// replace with right source operators
			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
			
			// if lastChar is operator self apply it to number
			if(operators.includes(lastChar)) {
				equation = equation + equation.replace(/.$/, '');
			}
			
			if(lastChar === ".") {
				equation = equation.replace(/.$/, "");
			}
			
			if(equation) {
				input.innerHTML = eval(equation);
				beenEvaluated = true;
			}
			
		};
		
		/*************
		Formula keys
		**************/
		
		function percentage() {
			
		};
		
		function squareRoot() {
			var equation = inputVal,
				numToSquare = 0,
				position = -1,
				square;
			
			(function positioning() {
				for(var i = (equation.length-1); i >=0; i--) {
					var needChar = equation.charAt(i);
					if(operators.includes(needChar)){
						position = i;
						return;
					}
				}
			})();
			
			numToSquare = equation.slice(position+1);
			equation = equation.slice(0, position+1);
			square = Math.sqrt(numToSquare);
			
			input.innerHTML = equation + square;
			beenEvaluated = true;
		};
		
		function powerOfTwo() {
			
			var equation = inputVal,
				numToSquare = 0,
				position = -1,
				square;
			
			(function positioning() {
				for(var i = (equation.length-1); i >=0; i--) {
					var needChar = equation.charAt(i);
					if(operators.includes(needChar)){
						position = i;
						return;
					}
				}
			})();
			
			numToSquare = equation.slice(position+1);
			equation = equation.slice(0, position+1);
			square = numToSquare*numToSquare;
			
			input.innerHTML = equation + square;
			beenEvaluated = true;
		};
		
		function fractionOne() {
			
			var equation = inputVal,
				numToFract = 0,
				position = -1,
				fract;
			
			(function positioning() {
				for(var i = (equation.length-1); i >=0; i--) {
					var needChar = equation.charAt(i);
					if(operators.includes(needChar)){
						position = i;
						return;
					}
				}
			})();
			
			numToFract = equation.slice(position+1);
			equation = equation.slice(0, position+1);
			fract = 1/numToFract;
			
			input.innerHTML = equation + fract;
			beenEvaluated = true;
		};
		
		
		
		/*************
		Logic functions
		**************/
		
		//operators logic fix
		function operateFix() {
			// Get the last character from the equation
			var lastChar = inputVal[inputVal.length - 1];
			// Only add operator if input is not empty and there is no operator at the last
			if(!operators.includes(lastChar)) {
				input.innerHTML += btnVal;
			}
			// prevent apear of ajacent operators or dots
			if(operators.includes(lastChar) || lastChar === "." ) {
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}
			
		
			decimalAdded = false;
			beenEvaluated = false;
		};
		// prevent multi decimals
		function decimalIndicator() {
			if(!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		};
		//keys append, initial zero fix
		function appending() {
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
		else if(btnVal === "\u221A") { /*Square Root 	\u1D4B3*/
			squareRoot();
		}
		else if(btnVal === "x\u00B2") { /*Power of two 	\u1D4B3*/
			powerOfTwo();
		}
		else if(btnVal === "1\u2044") { /*1/x fraction  \u2044*/
			fractionOne();
		}
		else if(btnVal === "\u00B1") { /*REVERSE*/
			reverse();
		}
		else if(btnVal === "\u232B") { /*ERASE*/
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
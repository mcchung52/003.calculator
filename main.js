$(function calculator() {
  'use strict';
  let prevOpnd="", currOpnd="0", op="";

  let documentReady = () => {
  	console.log('good');
  	
  	$('.op').click(function(event) {
  		let input = $(this).attr('id');

			

			switch (input) {
				case 'clear':
					op='';
					prevOpnd='';
					currOpnd='0';
					$('#display').text('0');
					break;
				case 'plus':
				case 'minus':
				case 'divide':
				case 'mult':
					// let symbol = $(this).val();
					// if (op==symbol) {

					// }
					// else
					if (Number(currOpnd) != 0) {
						prevOpnd = currOpnd;
						currOpnd = '0';
						op = $(this).text();
					}
					else {
						prevOpnd = currOpnd;
						op = $(this).text();
					}
					break;
				case 'percent':
					if (Number(currOpnd) != 0) {	//error case: keep doing %
						currOpnd = (Number(currOpnd) / 100).toString();
						currOpnd = currOpnd.slice(0,Math.min(9,currOpnd.length));
						$('#display').text(currOpnd);
					}
					break;
				case 'equals':
					if (prevOpnd!=''&&op!='') {
						let result;
						switch(op) {
							case '+':
								result = Number(prevOpnd) + Number(currOpnd);
								break;
							case '-':
								result = Number(prevOpnd) - Number(currOpnd);
								break;
							case '*':
								result = Number(prevOpnd) * Number(currOpnd);
								break;
							case '/':
								result = Number(prevOpnd) / Number(currOpnd);
								break;
						}
						currOpnd = '';//result.toString();
						op = '';
						prevOpnd = '';
						$('#display').text(result);
					}
					break;
			}

  	});

		$('.opnd').click(function(event) {

			let input = $(this).attr('id');

			if (currOpnd.length < 9) {
	  		if (input=='sign') {	//sign
	  			if (Number(currOpnd) != 0) {
		  			if (currOpnd[0]=='-') {
		  				currOpnd = currOpnd.slice(1); 
		  			}
		  			else {
		  				currOpnd = "-" + currOpnd;
		  			}	  				
	  			}
	  		}
	  		else if (input=='dot') { //dot
	  			if(currOpnd.indexOf(".") == -1) {
	  				currOpnd += ".";
	  			} 
	  		}
	  		else { //numbers
	  			if (currOpnd[0]=='0'&&input!=0&&currOpnd.length==1) {
	  				currOpnd = input;	  						
	  			}
	  			else if (currOpnd[0]=='0'&&input==0&&currOpnd.length==1) {
	  				currOpnd = input;
	  			}
	  			else {
	  				// if (input!='0') {
	  				// 	if (currOpnd.length==2 && currOpnd[1]=='.') {
	  						currOpnd += input;
	  				// 	}
	  				// 	else {
	  				// 	}
	  				// }
	  			// }
	  			// else {
	  				//currOpnd += input;	  				
	  			}
	  		}
	  		$('#display').text(currOpnd);
			}
		});
  }

  $(documentReady);
});
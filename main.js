'use strict';

var opnd1="0", opnd2="", op=""; //always start with a default, 0

//we move thru states depending on the input
// state: 1 = start (default)
// state: 2 = 1st operand
// state: 3 = 1st operand + op
// state: 4 = 1st operand + op + 2nd operand
var state = 1;

$(function calculator() {

  var documentReady = () => { 
  	
  	$('.op').on('click',function(e) { 
  		var disp = evaluate(e.target.id,'op');
  		$('#display').text(disp);
  		$('#sideDisplay').text(op==''?'':$('#'+op).text());
  	});
  	$('.opnd').click(function(e) {
  		var disp = evaluate(e.target.id,'opnd');
  		$('#display').text(disp);
  		$('#sideDisplay').text(op==''?'':$('#'+op).text());
  	});
  }

  $(documentReady);
});

//returns what to display
function evaluate(token,opORopnd) {
	var disp = '';
	switch(state) {
		case 1:
			if (opORopnd=='opnd') { //if it's opnd
				if (token=='dot') {
					if (opnd1.indexOf(".") == -1) {
						opnd1 += '.';
					}
					disp = opnd1;
					state = 2;
				}
				else {
					opnd1 = token;
					state = 2;
					disp = opnd1;								
				}
			}
			else {
				switch(token) {
					case 'clear':
						opnd1 = '0';
						opnd2 = '';
						op = '';
						disp = opnd1;
						break;
					case 'plus':
					case 'minus':
					case 'mult':
					case 'divide':
						op = token;
						state = 3;
						disp = opnd1;
						break;
					case 'equal':
						op = '';
						disp = opnd1;
						break;	
					case 'percent':
						opnd1 = (Number(opnd1) / 100).toString();
						disp = opnd1;
						break;		
				}
			}
			break;
		case 2:
			if (opORopnd=='opnd') {
				if (token=='dot') {
					if (opnd1.indexOf(".") == -1) {
						opnd1 += '.';
					}
					disp = opnd1;
				}
				else {
					if (token=='0'&&opnd1.indexOf(".")==-1) {
						if (Number(opnd1)!=0) {
							opnd1 += token;
						}
					}
					else if (opnd1=='0'&&token!='0') {
						opnd1 = token;
					}
					else {
						if (opnd1.length<9) {
							opnd1 += token;							
						}
					}
					disp = opnd1;
				}
			}
			else {
				switch(token) {
					case 'sign':
						opnd1 = (Number(opnd1) * -1).toString();
						//state = 1;
						disp = opnd1;
						break;
					case 'percent':
						opnd1 = (Number(opnd1) / 100).toString();
						//state = 1;
						disp = opnd1;
						break;
					case 'clear':
						opnd1 = '0';
						opnd2 = '';
						op = '';
						state = 1;
						disp = opnd1;
						break;
					case 'plus':
					case 'minus':
					case 'mult':
					case 'divide':
						op = token;
						state = 3;
						disp = opnd1;
						break;
					case 'equal':
						op = '';
						state = 1;
						disp = opnd1;
						break;
				}
			}
			break;
		case 3:
			if (opORopnd=='opnd') {
				opnd2 = token;
				state = 4;
				disp = opnd2;
			}
			else {
				switch(token) {
					case 'equal':
						switch(op) {
							case 'plus':
								opnd1 = (Number(opnd1) + Number(opnd1)).toString();
								break;
							case 'minus':
								opnd1 = (Number(opnd1) - Number(opnd1)).toString();
								break;
							case 'mult':
								opnd1 = (Number(opnd1) * Number(opnd1)).toString();
								break;
							case 'divide':
								opnd1 = (Number(opnd1) / Number(opnd1)).toString();
								break;
						}
						op = '';
						state = 2;
						disp = opnd1;
						break;
					case 'clear':
						opnd1 = '0';
						opnd2 = '';
						op = '';
						state = 1;
						disp = opnd1;
						break;
					case 'percent':
						opnd2 = (Number(opnd1) * Number(opnd1) / 100).toString();
						state = 4;
						disp = opnd2;
						break;
					case 'sign':
						opnd2 = (Number(opnd1) * -1).toString();
						state = 4;
						disp = opnd2;
						break;
					case 'plus':
					case 'minus':
					case 'mult':
					case 'divide':
						op = token;
						disp = opnd1;
						break;
				}
			}
			break;
		case 4:
			if (opORopnd=='opnd') {
				if (token=='dot') {
					if (opnd2.indexOf(".") == -1) {
						opnd2 += '.';
					}
					disp = opnd2;
				}
				else {
					if (token=='0'&&opnd2.indexOf(".")==-1) {
						if (Number(opnd2)!=0) {
							opnd2 += token;
						}
					}
					else if (opnd2=='0'&&token!='0') {
						opnd2 = token;
					}
					else {
						if (opnd2.length<9) {
							opnd2 += token;							
						}
					}
					disp = opnd2;
				}
			}
			else {
				switch(token) {
					case 'percent':
						opnd2 = (Number(opnd1) * Number(opnd2) / 100).toString();
						disp = opnd2;
						break;
					case 'sign':
						opnd2 = (Number(opnd2) * -1).toString();
						disp = opnd2;
						break;
					case 'clear':
						opnd1 = '0';
						opnd2 = '';
						op = '';
						state = 1;
						disp = opnd1;
						break;
					case 'equal':
						switch(op) {
							case 'plus':
								opnd1 = (Number(opnd1) + Number(opnd2)).toString();
								break;
							case 'minus':
								opnd1 = (Number(opnd1) - Number(opnd2)).toString();
								break;
							case 'mult':
								opnd1 = (Number(opnd1) * Number(opnd2)).toString();
								break;
							case 'divide':
								opnd1 = (Number(opnd1) / Number(opnd2)).toString();
								break;
						}
						opnd2 = '';
						op = '';
						state = 1;
						disp = opnd1;
						break;
					case 'plus':
					case 'minus':
					case 'mult':
					case 'divide':
						switch(op) {
							case 'plus':
								opnd1 = (Number(opnd1) + Number(opnd2)).toString();
								break;
							case 'minus':
								opnd1 = (Number(opnd1) - Number(opnd2)).toString();
								break;
							case 'mult':
								opnd1 = (Number(opnd1) * Number(opnd2)).toString();
								break;
							case 'divide':
								opnd1 = (Number(opnd1) / Number(opnd2)).toString();
								break;
						}
						op = token;
						state = 3;
						disp = opnd1;
						break;
				}
			}
			break;
	}
	return disp;
}


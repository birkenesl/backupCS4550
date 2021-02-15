(function() {
	"use strict";
	

	var state = {nums: ["0", "0"], currentOp: "none"}; // global state obj 
	// nums correspond to the operands

	function onNumberPress(element) {

		if (state.currentOp === "none") {
			append(0, element); // append will handle decimal
			display(state.nums[0]);
		}
		else {
			append(1, element);
			display(state.nums[1]);
		}


	}

	function onOperationPress(element) {
		
		if (state.currentOp === "none") {
			state.currentOp = element;
		}
		else {

			if (state.nums[1] === "0") {
				state.currentOp = element;
				console.log("oops");
			}
			else {
				doMath(state.currentOp);
				state.nums[1] = "0";
				state.currentOp = element;


			}
			
		}


	}

	function doMath(op) {
		
		switch(op) {
			case "+/=":
				state.nums[0]
					= Number(state.nums[0]) + Number(state.nums[1]);
				break;
			case "-":
				state.nums[0] = Number(state.nums[0]) - Number(state.nums[1]);
				break;
			case "*":
				state.nums[0] = Number(state.nums[0]) * Number(state.nums[1]);
				break;
			case "/":
				state.nums[0] = Number(state.nums[0]) / Number(state.nums[1]);
				break;
			default:
				break;
		}
		display(state.nums[0]);
	
	}

	function onClear() {
		state.nums[0] = "0";
		state.nums[1] = "0";
		state.currentOp = "none";
		display(0);

	}

	function display(element) {

		document.getElementById("output").value = element;
	}

	function append(operand, num) {
		if (num === "." && state.nums[operand].includes(".")) {
			return;
		} // catch the case of multiple decimals (we don't want that)

		if (state.nums[operand] === "0") {
			state.nums[operand] = num;
		}
		else {
			state.nums[operand] += num;
		}


	}

	function init() {
		let nums = document.getElementsByClassName("number");
		nums = Array.from(nums);
		nums.forEach(function(n) {
			n.addEventListener("click", function(){
				onNumberPress(n.innerText);});
		});

		let ops = document.getElementsByClassName("operation");
		ops = Array.from(ops);
		ops.forEach(function(o) {
			o.addEventListener("click", function(){
				onOperationPress(o.innerText);});
		});

		let c = document.getElementById("clear");
		c.addEventListener("click", onClear);

	}

	window.addEventListener("load", init, false);

	
})()

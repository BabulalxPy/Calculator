//functions for calculations
function add(num1, num2){
    return (parseFloat(num1)+ parseFloat(num2));
};

function subtract(num1, num2){
    return num1 - num2;
};

function multiply(num1, num2){
    return num1*num2;
};

function divide(num1, num2) {
    if (+num2 === 0) {
        displayValue.textContent = "Cannot divide by zero";
        return "Lmao";
    }
    return num1 / num2;
}

function remainder(num1, num2){
    return num1%num2;
}

// function for operating the input values
const operators = {
    "+": (num1, num2) => add(num1, num2),
    "-": (num1, num2) => subtract(num1, num2),
    "*": (num1, num2) => multiply(num1, num2),
    "/": (num1, num2) => divide(num1, num2),
    "%": (num1, num2) => remainder(num1, num2),
};

function operate(num1, operator, num2) {
    if (operators[operator]) {
        ans = operators[operator](num1, num2);
    } else {
        console.log("lmao");
    }
}

//declaring all the required variables
let num1 = null;
let operator = null;
let num2 = null;
let ans = null;
let update = null; //used for logic building in input digits for chained and fresh calculations

const container = document.querySelector(".container");
const displayValue = document.querySelector(".display");
const row1 = document.querySelector(".row1");

//Allclear button to clear display and set all the values to null
const allClear = document.querySelector(".ac");
allClear.addEventListener("click", () =>{
    displayValue.textContent = 0;
    num1 = null;
    num2 = null;
    operator = null;
    ans = null;
})

//to input the digits 
container.addEventListener("click", (event) => {
    if(event.target.classList.contains("digit")){
        const digit = event.target.textContent;
        handleDigitClick(digit);
    }
});
//function for digits 
function handleDigitClick(digit){
    if(num2 === null && operator === null && update == null){ // first operand
        displayValue.textContent += digit;
        num1 = displayValue.textContent;
        //console.log(num1,num2,operator,ans, update);

    }
    else if(operator !== null && update === null){ // second operand
        displayValue.textContent += digit;
        num2 = displayValue.textContent;
        //console.log(num1,num2,operator,ans, update);
    }
    else if(update === "done"){ // for chained and fresh calculation when equal to used
        displayValue.textContent = digit; // Start a new calculation, set display to digit
        num1 = digit; //set num1 to digit
        num2 = null; //reset num2
        operator = null; //reset operator
        update = null; //reset update
        //console.log(num1, num2, operator, ans, update);
    }
    else if(update === "upDone"){ // for chained and fresh calculation when operator continued used
        displayValue.textContent = digit; // Start a new calculation, set display to digit
        //set num1 to digit
        num2 = displayValue.textContent; //reset num2
         //reset operator
        update = null; //reset update
        //console.log(num1, num2, operator, ans, update);
    }

};

//input decimal
container.addEventListener("click", (event)=> {
    if(event.target.classList.contains("decimal")){
        handleDecimalClick();
    }
})
//function to input decimal without repeating or having decimal in one value
function handleDecimalClick() {
    if (operator === null) {
        // Decimal for num1
        if (num1 === null) {
            num1 = "0.";
            displayValue.textContent = "0.";
        } else if (!num1.includes(".")) {
            num1 += ".";
            displayValue.textContent += ".";
        }
    } else {
        // Decimal for num2
        if (num2 === null) {
            num2 = "0.";
            displayValue.textContent = "0.";
        } else if (!num2.includes(".")) {
            num2 += ".";
            displayValue.textContent += ".";
        }
    }
}

//input operators
container.addEventListener("click", (event) => {
    if(event.target.classList.contains("operator")){
        const operatorValue = event.target.textContent;
        handleOperatorClick(operatorValue);
    }
});
// one function for all operators
function handleOperatorClick(operatorValue){
    // change X to * for calculations
    if(operatorValue === "X"){
        operatorValue = "*";
    }

    if (operator === null) { //first operator input
        if (num1 !== null && num2 !== null) { // Check if a previous calculation was made
            operate(num1, operator, num2);
            num1 = ans;
            num2 = null;
            displayValue.textContent = ans;
        }
        operator = operatorValue;
        displayValue.textContent = "";
        //console.log(num1, num2, operator, ans, update);
        update = null; //reset update
    } 
    else { // operator for chained calculations
        operate(num1, operator, num2);
        displayValue.textContent = ans;
        num1 = ans;
        num2 = null;
        operator = operatorValue; //set the operator to addition for chaining.
        //console.log(num1, num2, operator, ans, update);
        update = "upDone"; //reset update
    }
}

//Equal to button
const equal = document.querySelector(".equal");
equal.addEventListener("click", () =>{
    operate(num1,operator,num2);
    displayValue.textContent = ans;
    num1 = ans;
    num2 = null;
    operator = null;
    update = "done";
    //console.log(num1,num2,operator,ans, update);
})

//backspace button 
const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", () =>{
    if (operator === null) {
        // Backspace for num1
        if (num1 !== null && num1.length > 0) {
            num1 = num1.slice(0, -1); // Remove the last character
            displayValue.textContent = num1;
            if (num1 === "") {
                num1 = null; // Set num1 to null if it becomes empty
                displayValue.textContent = "0";
            }
        }
    } else {
        // Backspace for num2
        if (num2 !== null && num2.length > 0) {
            num2 = num2.slice(0, -1);
            displayValue.textContent = num2;
            if (num2 === "") {
                num2 = null;
                displayValue.textContent = "0";
            }
        }
    }
})


// ... (your existing code) ...

document.addEventListener('keydown', handleKeyboardInput);

function handleKeyboardInput(event) {
  const key = event.key;

  if (/[0-9]/.test(key)) {
    handleDigitClick(key);
  } else if (['+', '-', '*', '/', '%'].includes(key)) {
    handleOperatorClick(key);
  } else if (key === '.') {
    handleDecimalClick();
  } else if (key === 'Enter' || key === '=') {
    document.querySelector('.equal').click();
  } else if (key === 'Backspace') {
    document.querySelector('.backspace').click();
  } else if (key === 'Escape' || key === 'Delete') {
    document.querySelector('.ac').click();
  }
}

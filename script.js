function add(num1, num2){
    return ((+num1)+(+num2));
};

function subtract(num1, num2){
    return num1 - num2;
};

function multiply(num1, num2){
    return num1*num2;
};

function divide(num1, num2){
    return num1/num2;
};

function remainder(num1, num2){
    return num1%num2;
}


function operate(num1, operator, num2){
    if(operator == "+"){
        console.log(add(num1, num2));
    }else if(operator == "-"){
        console.log(subtract(num1, num2));
    }else if(operator == "*"){
        console.log(multiply(num1, num2));
    }else if(operator == "/"){
        console.log(divide(num1, num2));
    }else if(operator == "%"){
        console.log(remainder(num1, num2));
    }else{
        console.log("fuck off");
    }
};

let num1;
let operator;
let num2;

const container = document.querySelector(".container");
const displayValue = document.querySelector(".display");
const row1 = document.querySelector(".row1");

const allClear = document.querySelector(".ac");
allClear.addEventListener("click", () =>{
    displayValue.textContent = "";
    num1 = displayValue.textContent;
})

const seven = document.querySelector(".seven");
seven.addEventListener("click", () =>{
    displayValue.textContent += 7;
    num1 = displayValue.textContent;
    
})

const zero = document.querySelector(".zero");
zero.addEventListener("click", () =>{
    displayValue.textContent += 0;
    num1 = displayValue.textContent;
})

const equal = document.querySelector(".equal");
equal.addEventListener("click", () =>{
    console.log(num1);
})



function display(){ 
}

//operate(num1,operator,num2);


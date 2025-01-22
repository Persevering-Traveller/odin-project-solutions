// Javascript has no enums and that's a shame...
const NO_OP = -1
const OP_ADD = 0;
const OP_SUB = 1;
const OP_MUL = 2;
const OP_DIV = 3;

let numberBank1 = 0;
let numberBank2 = 0;
let operation = -1;
let operationString = " ";

const calculatorScreen = document.querySelector(".screen");



// Add onclick button listeners
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    numberBank1 = 0;
    numberBank2 = 0;
    operation = NO_OP;
    operationString = " ";
    calculatorScreen.textContent = "";
});

const backspaceButton = document.querySelector("#backspace");
backspaceButton.addEventListener("click", () => {
    if(operation === NO_OP) {
        numberBank1 = Math.floor(numberBank1 / 10);
    }
    else if(operation !== NO_OP && numberBank2 === 0) {
        operation = NO_OP;
        operationString = " ";
    }
    else {
        numberBank2 = Math.floor(numberBank2 / 10);
    }

    calculatorScreen.textContent = calculatorScreen.textContent.slice(0, calculatorScreen.innerHTML.length - 1);
})

// Number buttons
const numberButtonCollection = document.querySelectorAll(".number");
numberButtonCollection.forEach((button, i) => {
    button.addEventListener("click", () => {
        if(i === 9) return;
        if(operation === NO_OP){ 
            numberBank1 = (numberBank1 * 10) + (i + 1);
            calculatorScreen.textContent = numberBank1;
         }
        else {
            numberBank2 = (numberBank2 * 10) + (i + 1);
            calculatorScreen.textContent = numberBank1 + operationString + numberBank2;
        }
    });
});

// since the zero button is the last in the collection and operates differently, directly set it
numberButtonCollection[numberButtonCollection.length - 1].addEventListener("click", () => {
    if(operation === -1) {
        numberBank1 *= 10;
        calculatorScreen.textContent = numberBank1;
    }
    else {
        numberBank2 *= 10;
        calculatorScreen.textContent = numberBank1 + operationString + numberBank2;
    }
        
});

const addOperation = document.querySelector("#add");
addOperation.addEventListener("click", () => {
    if(operation !== NO_OP || numberBank1 === 0) return;
    operation = OP_ADD;
    operationString = "+";
    calculatorScreen.textContent += operationString;
});

const subtractOperation = document.querySelector("#subtract");
console.log(subtractOperation);
subtractOperation.addEventListener("click", () => {
    if(operation !== NO_OP || numberBank1 === 0) return;
    operation = OP_SUB;
    operationString = "-";
    calculatorScreen.textContent += operationString;
});

const multiplyOperation = document.querySelector("#multiply");
multiplyOperation.addEventListener("click", () => {
    if(operation !== NO_OP || numberBank1 === 0) return;
    operation = OP_MUL;
    operationString = "*";
    calculatorScreen.textContent += operationString;
})

const divideOperation = document.querySelector("#divide");
divideOperation.addEventListener("click", () => {
    if(operation !== NO_OP || numberBank1 === 0) return;
    operation = OP_DIV;
    operationString = "/";
    calculatorScreen.textContent += operationString;
})

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () =>  {
    if(numberBank2 === 0) return;
    switch(operation) {
        case OP_ADD: numberBank1 = numberBank1 + numberBank2; break;
        case OP_SUB: numberBank1 = numberBank1 - numberBank2; break;
        case OP_MUL: numberBank1 = numberBank1 * numberBank2; break;
        case OP_DIV: numberBank1 = numberBank1 / numberBank2; break;
        default: return;
    }

    numberBank2 = 0;
    operation = NO_OP;
    operationString = " ";
    calculatorScreen.textContent = numberBank1;
})
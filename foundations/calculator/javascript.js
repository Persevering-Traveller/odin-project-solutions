// Javascript has no enums and that's a shame...
const NO_OP = -1
const OP_ADD = 0;
const OP_SUB = 1;
const OP_MUL = 2;
const OP_DIV = 3;

const MAX_FLOATING_POINT = 5;

let numberBank1 = 0;
let numberBank2 = 0;
let operation = -1;
let operationString = " ";
let dotMode = false;
let dotMultiple = 0.1;
let dotPlace = 1;

const calculatorScreen = document.querySelector(".screen");

// Add onclick button listeners
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    numberBank1 = 0;
    numberBank2 = 0;
    operation = NO_OP;
    operationString = " ";
    turnOffDotMode();
    calculatorScreen.textContent = "";
});

function shaveOffOneFloatingPointDigit(numBank) {
    if(Math.floor(numBank) === numBank) {
        turnOffDotMode();
        return numBank;
    }
    dotPlace--;
    dotMultiple *= 10;
    // It's kind of a waste of variables, but it makes the math make sense!!
    let onlyFloatingPoint = numBank % 1;
    let floatingPointToWholeNumber = onlyFloatingPoint * (10**dotPlace);
    let shaveOffOneDigit = Math.floor(floatingPointToWholeNumber / 10);
    let turnBackIntoFloatingPoint = shaveOffOneDigit * (dotMultiple * 10); // Make dot multiple one place less for proper number
    return Math.floor(numBank) + turnBackIntoFloatingPoint;
}

// Wow, so Javascript apparently has really bad floating point math precision,
// like REALLY REALLY REALLY bad. So this is absolutely necessary or else 2.3 + 0.03
// might equal 2.329999999999992 or something silly like that.
function getPreciseFloatingPoint(numBank, number) {
    let newNumber = (numBank + (number * dotMultiple)).toFixed(dotPlace);
    return Number(newNumber);
}

const backspaceButton = document.querySelector("#backspace");
backspaceButton.addEventListener("click", () => {
    if(operation === NO_OP) {
        if(dotMode) {
            numberBank1 = shaveOffOneFloatingPointDigit(numberBank1);
        }
        else
            numberBank1 = Math.floor(numberBank1 / 10);
    }
    else if(operation !== NO_OP && numberBank2 === 0) {
        operation = NO_OP;
        operationString = " ";
    }
    else {
        if(dotMode)
            numberBank2 = shaveOffOneFloatingPointDigit(numberBank2);
        else
            numberBank2 = Math.floor(numberBank2 / 10);
    }

    calculatorScreen.textContent = calculatorScreen.textContent.slice(0, calculatorScreen.innerHTML.length - 1);
})

const dotButton = document.querySelector("#dot");
dotButton.addEventListener("click", () => {
    if(dotMode) return;
    dotMode = true;
    if(numberBank1 === 0 && (numberBank1 !== 0 && numberBank2 === 0))
        calculatorScreen.textContent += "0."
    else
        calculatorScreen.textContent += ".";
});

// Number buttons
const numberButtonCollection = document.querySelectorAll(".number");
numberButtonCollection.forEach((button, i) => {
    button.addEventListener("click", () => {
        if(i === 9) return;
        if(operation === NO_OP){ 
            if(dotMode) {
                if(dotPlace <= MAX_FLOATING_POINT) {
                    numberBank1 = getPreciseFloatingPoint(numberBank1, i+1);
                    dotMultiple /= 10;
                    dotPlace++;
                }
            }
            else
                numberBank1 = (numberBank1 * 10) + (i + 1);
            calculatorScreen.textContent = numberBank1;
         }
        else {
            if(dotMode) {
                if(dotPlace <= MAX_FLOATING_POINT) {
                    numberBank2 = getPreciseFloatingPoint(numberBank2, i + 1);
                    dotMultiple /= 10;
                    dotPlace++;
                }
            }
            else
                numberBank2 = (numberBank2 * 10) + (i + 1);
            calculatorScreen.textContent = numberBank1 + operationString + numberBank2;
        }
    });
});

// since the zero button is the last in the collection and operates differently, directly set it
numberButtonCollection[numberButtonCollection.length - 1].addEventListener("click", () => {
    if(operation === -1) {
        if(dotMode) {
            numberBank1 *= 1.0;
            dotMultiple /= 10;
        }
        else
            numberBank1 *= 10;
        calculatorScreen.textContent = numberBank1;
    }
    else {
        if(dotMode) {
            numberBank2 *= 1.0;
            dotMultiple /= 10;
        }
        else
            numberBank2 *= 10;
        calculatorScreen.textContent = numberBank1 + operationString + numberBank2;
    }
        
});

function turnOffDotMode() {
    dotMode = false;
    dotMultiple = 0.1;
    dotPlace = 1;
}

const addOperation = document.querySelector("#add");
addOperation.addEventListener("click", () => {
    if(operation !== NO_OP || numberBank1 === 0) return;
    operation = OP_ADD;
    operationString = "+";
    turnOffDotMode();
    calculatorScreen.textContent += operationString;
});

const subtractOperation = document.querySelector("#subtract");
console.log(subtractOperation);
subtractOperation.addEventListener("click", () => {
    if(operation !== NO_OP || numberBank1 === 0) return;
    operation = OP_SUB;
    operationString = "-";
    turnOffDotMode();
    calculatorScreen.textContent += operationString;
});

const multiplyOperation = document.querySelector("#multiply");
multiplyOperation.addEventListener("click", () => {
    if(operation !== NO_OP || numberBank1 === 0) return;
    operation = OP_MUL;
    operationString = "*";
    turnOffDotMode();
    calculatorScreen.textContent += operationString;
})

const divideOperation = document.querySelector("#divide");
divideOperation.addEventListener("click", () => {
    if(operation !== NO_OP || numberBank1 === 0) return;
    operation = OP_DIV;
    operationString = "/";
    turnOffDotMode();
    calculatorScreen.textContent += operationString;
})

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () =>  {
    if(numberBank2 === 0 && operation === OP_DIV) {
        calculatorScreen.textContent = "Oh no x_X!";
        return;
    }
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
    turnOffDotMode();
    calculatorScreen.textContent = numberBank1;
})
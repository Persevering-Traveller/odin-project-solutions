/* Functions to create:
Math operations:
* Add
* Subtract
* Multiply
* Divide

Operate - Will begin the actual math operation
addToScreen - Will add whatever numeral or dot(.) the user enters
clearScreen - Will also clear any variables
removeLastEntry - Will remove whatever numeral or dot(.) the user enters
*/

// Javascript has no enums and that's a shame...
const OP_ADD = 0;
const OP_SUB = 1;
const OP_MUL = 2;
const OP_DIV = 3;

let numberBank1 = 0;
let numberBank2 = 0;
let operation = -1;

// Add onclick button listeners
const buttonCollection = document.querySelectorAll(".number");
buttonCollection.forEach((button, i) => {
    button.addEventListener("click", () => {
        if (i === 9) return;
        (operation === -1) ? numberBank1 = (numberBank1 * 10) + (i + 1) : numberBank2 = (numberBank2 * 10) + (i + 1);
    });
});

// since the zero button is the last in the collection and operates differently, directly set it
buttonCollection[buttonCollection.length - 1].addEventListener("click", () => {
    (operation === -1) ? numberBank1 *= 10 : numberBank2 *= 10;
});
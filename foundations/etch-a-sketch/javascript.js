function buildSquare(widthAndHeight) {
    let square = document.createElement("div");
    square.setAttribute("class", "square");
    square.style.width = `${widthAndHeight}px`;
    square.style.height = `${widthAndHeight}px`;
    square.addEventListener("mouseenter", () => {
        square.style.backgroundColor = "black";
        square.style.opacity = `${+square.style.opacity + .1}`
    });
    return square;
}

function buildDrawingArea() {
    // Build a 16x16 grid of square divs
    const container = document.querySelector(".container");
    const containerWidth = container.clientWidth; // Javascript apparently can't do 'document.querySelector(".container").clientWidth'....
    const squareWidthAndHeight = Math.floor(containerWidth / 16)
    for(let i = 0; i < 16*16; i++) {
        let square = buildSquare(squareWidthAndHeight);
        container.appendChild(square);
    }
}

function rebuildDrawingArea(newGridSize) {
    const body = document.querySelector("body");
    let container = document.querySelector(".container");
    body.removeChild(container);

    container = document.createElement("div");
    container.setAttribute("class", "container");
    body.appendChild(container);
    // The pain I had to go through to find this property............
    const containerWidth = container.clientWidth;
    const newWidthAndHeight = Math.floor(containerWidth / newGridSize);
    for(let i = 0; i < newGridSize * newGridSize; i++) {
        let square = buildSquare(newWidthAndHeight);
        container.appendChild(square);
    }
}

buildDrawingArea();

const changeButton = document.querySelector("#change-button");
changeButton.addEventListener("click", () => {
    let gridSize = prompt("What grid size would you like the drawing area to be?\
        \n(example answer: 10 -> 10x10 grid)\n(Please choose a number lower than 100)");
    if (gridSize > 100) gridSize = 100;
    if (gridSize == null || isNaN(+gridSize)) gridSize = 16;
    rebuildDrawingArea(gridSize);
});
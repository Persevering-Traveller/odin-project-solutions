function buildDrawingArea() {
    // Build a 16x16 grid of square divs
    const container = document.querySelector(".container");
    for(let i = 0; i < 16*16; i++) {
        let square = document.createElement("div");
        square.setAttribute("class", "square");
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
        let square = document.createElement("div");
        square.setAttribute("class", "square");
        square.style.width = `${newWidthAndHeight}px`;
        square.style.height = `${newWidthAndHeight}px`;
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
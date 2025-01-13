function buildDrawingArea() {
    // Build a 16x16 grid of square divs
    const container = document.querySelector(".container");
    for(let i = 0; i < 16*16; i++) {
        let square = document.createElement("div");
        square.setAttribute("class", "square");
        container.appendChild(square);
    }
}

function rebuildDrawingArea(newPixelSize) {
    const body = document.querySelector("body");
    let container = document.querySelector(".container");
    body.removeChild(container);

    container = document.createElement("div");
    container.setAttribute("class", "container");
    body.appendChild(container);
    for(let i = 0; i < newPixelSize * newPixelSize; i++) {
        let square = document.createElement("div");
        square.setAttribute("class", "square");
        square.setAttribute("width", `${newPixeSize}px`);
        square.setAttribute("height", `${newPixeSize}px`);
        container.appendChild(square);
    }
}

buildDrawingArea();
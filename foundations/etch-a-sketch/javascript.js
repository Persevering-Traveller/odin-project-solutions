function buildDrawingArea() {
    // Build a 16x16 grid of square divs
    const body = document.querySelector(".container");
    for(let i = 0; i < 16*16; i++) {
        let square = document.createElement("div");
        square.setAttribute("class", "square");
        body.appendChild(square);
    }
}

buildDrawingArea();
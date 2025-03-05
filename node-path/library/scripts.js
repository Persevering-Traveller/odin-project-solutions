const myLibrary = [];

function Book(name, author, pages, read) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(name, author, pages, read) {
    myLibrary.push(new Book(name, author, pages, read));
}

function showLibrary() {
    const libraryTable = document.querySelector(".library-table");

    for(let i = 0; i < myLibrary.length; i++) {
        let newBookRow = document.createElement("tr");

        createNewItem(myLibrary[i].name, newBookRow);
        createNewItem(myLibrary[i].author, newBookRow);
        createNewItem(myLibrary[i].pages, newBookRow);
        createNewItem((myLibrary[i].read) ? "Yes" : "No", newBookRow);

        libraryTable.appendChild(newBookRow);
    }
}

function createNewItem(contents, tableRow) {
    newItem = document.createElement("td");
    newItem.textContent = contents;
    tableRow.appendChild(newItem);
}
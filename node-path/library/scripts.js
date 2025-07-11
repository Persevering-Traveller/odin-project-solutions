const myLibrary = [];
const newBookBtn = document.querySelector(".new-book");
const submitBtn = document.querySelector(".submit-btn");
const closeBtn = document.querySelector(".close-btn");
const newBookDialog = document.querySelector(".book-entry");
const bookForm = document.querySelector("#book-form");

// Validation
const nameEntry = document.querySelector("#name");
const authorEntry = document.querySelector("#author");
const pagesEntry = document.querySelector("#pages");

class Book {
    id = crypto.randomUUID();
    name;
    author;
    pages;
    read;

    constructor(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

function addBookToLibrary(name, author, pages, read) {
    myLibrary.push(new Book(name, author, pages, read));
}

function showLibrary() {
    const libraryTableBody = document.querySelector(".library-table-body");
    libraryTableBody.textContent = ""; // Clear body to rebuild table

    for(let i = 0; i < myLibrary.length; i++) {
        let newBookRow = document.createElement("tr");
        newBookRow.setAttribute("data-id", myLibrary[i].id);

        createNewItem(myLibrary[i].name, newBookRow);
        createNewItem(myLibrary[i].author, newBookRow);
        createNewItem(myLibrary[i].pages, newBookRow);
        createNewItem((myLibrary[i].read) ? "Yes" : "No", newBookRow);
        
        let readBtn = document.createElement("button");
        readBtn.textContent = "Read/Not Read";
        readBtn.addEventListener("click", () => {
            myLibrary[i].toggleRead();
            showLibrary() // Rebuild library to see changes.
        });
        newBookRow.appendChild(readBtn);

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            document.querySelector(`[data-id="${myLibrary[i].id}"]`).remove();
            myLibrary.splice(i, 1);
            showLibrary(); // Rebuild library after deleting to properly update indices
        });
        newBookRow.appendChild(removeBtn);

        libraryTableBody.appendChild(newBookRow);
    }
}

function createNewItem(contents, tableRow) {
    newItem = document.createElement("td");
    newItem.textContent = contents;
    tableRow.appendChild(newItem);
}


newBookBtn.addEventListener("click", () => {
    newBookDialog.showModal();
});

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (nameEntry.validity.valueMissing) {
        nameEntry.setCustomValidity("Must enter a book name");
        nameEntry.reportValidity();
        return;
    }
    if (authorEntry.validity.valueMissing) {
        authorEntry.setCustomValidity("Must enter author name");
        authorEntry.reportValidity();
        return;
    }
    if (pagesEntry.validity.valueMissing) {
        pagesEntry.setCustomValidity("Must enter page amount");
        pagesEntry.reportValidity();
        return;
    }

    const formData = new FormData(bookForm);
    addBookToLibrary(formData.get("name"), 
                     formData.get("author"), 
                     formData.get("pages"),
                     formData.get("read"));
    
    showLibrary();
    newBookDialog.close();
});

closeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    newBookDialog.close();
});
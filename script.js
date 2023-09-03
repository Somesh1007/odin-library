const booksContainer = document.querySelector('.books-container')
const addBookButton = document.querySelector('.add-book-button')
addBookButton.addEventListener('click', addBookToLibrary)

// Default Books
let book1 = new Book('Lord Of The Rings', 'Tolkien', 500, false)
let book2 = new Book('Game Of Thrones', 'George RR Martin', 1000, true)
let book3 = new Book('Harry Potter', 'Unknown', 800, false)

//Store All Books in Library Array
let myLibrary = [book1, book2, book3]
// Display Default Books
displayAllBooks()

function Book(name, author, pages, isRead) {
    this.name = name
    this.author = author
    this.pages = pages
    this.isRead = isRead

}

function displayAllBooks() {

    for (let index = 0; index < myLibrary.length; index++) {
        let book = myLibrary[index];

        let bookSection = document.createElement('div')
        bookSection.classList.add('book-section')
        bookSection.classList.add(`book-${index + 1}`)

        let bookName = document.createElement('div')
        bookName.classList.add('book-name')
        bookName.textContent = book.name

        let bookAuthor = document.createElement('div')
        bookAuthor.classList.add('book-author')
        bookAuthor.textContent = book.author

        let bookPages = document.createElement('div')
        bookPages.classList.add('book-pages')
        bookPages.textContent = `${book.pages} Pages`

        // Book Read Section
        let bookReadSection = document.createElement('div')
        bookReadSection.classList.add('book-read-section')

        let labelId = `book-read-${index + 1}`

        let checkboxLabel = document.createElement('label')
        checkboxLabel.textContent = 'Book Read ?'
        let forAttribute = document.createAttribute('for')
        forAttribute.value = labelId
        checkboxLabel.setAttributeNode(forAttribute)

        let checkboxInput = document.createElement('input')
        let typeAttribute = document.createAttribute('type')
        typeAttribute.value = 'checkbox'
        let nameAttribute = document.createAttribute('name')
        nameAttribute.value = labelId
        let idAttribute = document.createAttribute('id')
        idAttribute.value = labelId

        checkboxInput.setAttributeNode(typeAttribute)
        checkboxInput.setAttributeNode(nameAttribute)
        checkboxInput.setAttributeNode(idAttribute)


        if (book.isRead) {
            bookReadSection.classList.add('read')
            let checkedAttribute = document.createAttribute('checked')
            checkboxInput.setAttributeNode(checkedAttribute)

        } else {
            bookReadSection.classList.add('not-read')

        }

        bookReadSection.appendChild(checkboxLabel)
        bookReadSection.appendChild(checkboxInput)


        let removeBookButton = document.createElement('button')
        removeBookButton.classList.add('book-remove-button')
        removeBookButton.classList.add(`book-${index + 1}`)

        removeBookButton.textContent = 'Remove'


        bookSection.appendChild(bookName)
        bookSection.appendChild(bookAuthor)
        bookSection.appendChild(bookPages)
        bookSection.appendChild(bookReadSection)
        bookSection.appendChild(removeBookButton)

        booksContainer.appendChild(bookSection)


        // Event Listeners
        checkboxInput.addEventListener('change', handleBookReadCheckbox)
        removeBookButton.addEventListener('click', removeBookFromLibrary)

    }

}

function removeAllBooks() {
    let booksSection = document.querySelectorAll('.book-section')
    booksSection.forEach(bookSection => {
        bookSection.remove()
    });
}

function reloadAllBooks() {
    //To Avoid Book Sequence Number Issue. Reload again
    removeAllBooks() // Remove Existing DOM/HTML
    displayAllBooks() // Add New DOM/HTML
}

function addBookToLibrary(event) {
    console.log(`In addBookToLibrary : ${event}`);
    //myLibrary.push(book)
    //reloadAllBooks()

}

function removeBookFromLibrary(event) {
    let bookSequence = event.target.classList.item(1).split("-")[1] - 1
    myLibrary.splice(bookSequence, 1) // Remove Book from Library
    //event.target.parentElement.remove() // Remove Book from DOM/HTML

    reloadAllBooks()
}

function handleBookReadCheckbox(event) {
    let bookSequence = event.target.id.split("-")[2] - 1
    let isChecked = event.target.checked

    if (isChecked) {
        // Update Library Array
        myLibrary[bookSequence].isRead = true

        // Update DOM/HTML
        event.target.parentElement.classList.remove('not-read')
        event.target.parentElement.classList.add('read')

    } else {
        // Update Library Array
        myLibrary[bookSequence].isRead = false

        // Update DOM/HTML
        event.target.parentElement.classList.remove('read')
        event.target.parentElement.classList.add('not-read')

    }

}
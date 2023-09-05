const booksContainer = document.querySelector('.books-container')
const addBookButton = document.querySelector('.add-book-button')
const addBookDialog = document.querySelector('#add-book-dialog')
const dialogSubmitButton = document.querySelector('#dialog-submit')
const dialogCancelButton = document.querySelector('#dialog-cancel')

addBookButton.addEventListener('click', () => {
    addBookDialog.showModal()
})
dialogSubmitButton.addEventListener('click', addBookToLibrary)
dialogCancelButton.addEventListener('click', (event) => {
    event.preventDefault()
    addBookDialog.close()
})

// Default Books
let book1 = new Book('Lord Of The Rings', 'JRR Tolkien', 500, false)
let book2 = new Book('Game Of Thrones', 'George RR Martin', 1000, true)
let book3 = new Book('Harry Potter', 'JK Rowling', 800, false)

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

function getBookDetailsFromForm() {
    let bookName = document.querySelector('#book-name').value
    let bookAuthor = document.querySelector('#book-author').value
    let bookPages = document.querySelector('#book-pages').value
    let isBookRead = document.querySelector('#book-read').checked

    let errorDetails = ''

    if (bookName) {
        errorDetails += 'Invalid Book Name. '
    }

    if (!bookAuthor) {
        errorDetails += 'Invalid Book Author. '
    }

    if (!bookPages) {
        errorDetails += 'Invalid Book Pages. '
    }

    if (bookName && bookAuthor && bookPages) {
        let book = new Book(bookName, bookAuthor, bookPages, isBookRead)
        return book
    } else {
        return errorDetails.trim()
    }

}

function clearPreviousFormData() {
    document.querySelector('#book-name').value = ''
    document.querySelector('#book-author').value = ''
    document.querySelector('#book-pages').value = ''
    document.querySelector('#book-read').checked = false

}

function addBookToLibrary(event) {
    event.preventDefault()
    let book = getBookDetailsFromForm()

    if (book === null) {
        alert("Enter All the Details")
        return null
    } else if (typeof (book) === 'string') {
        // Set Error Message
        alert(`Enter All the Details : ${book}`)
    } else {
        // See If Book Name Already Exists in Library
        let searchedBook = myLibrary.filter(searchBook => (searchBook.name === book.name && searchBook.author === book.author))

        if (searchedBook !== null && searchedBook.length >= 1) {
            alert(`Book Already Exists in Library : ${book.name} by ${book.author}`)
        } else {
            // All Data Looks Goods
            myLibrary.push(book)
            reloadAllBooks()
            clearPreviousFormData()
            addBookDialog.close()
        }
    }
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
class Book {
    constructor(name, author, pages, isRead) {
        this.name = name
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

class Library {
    booksContainer = document.querySelector('.books-container')
    addBookButton = document.querySelector('.add-book-button')
    addBookDialog = document.querySelector('#add-book-dialog')
    dialogSubmitButton = document.querySelector('#dialog-submit')
    dialogCancelButton = document.querySelector('#dialog-cancel')
    myLibrary

    constructor(library) {
        this.myLibrary = library
        this.addEventListeners()
    }

    addEventListeners = () => {
        this.addBookButton.addEventListener('click', () => {
            this.addBookDialog.showModal()
        })
        this.dialogSubmitButton.addEventListener('click', (event) => this.addBookToLibrary(event))
        this.dialogCancelButton.addEventListener('click', (event) => {
            event.preventDefault()
            this.addBookDialog.close()
        })
    }


    displayAllBooks() {

        for (let index = 0; index < this.myLibrary.length; index++) {
            let book = this.myLibrary[index];

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

            this.booksContainer.appendChild(bookSection)


            // Event Listeners
            checkboxInput.addEventListener('change', (event) => this.handleBookReadCheckbox(event))
            removeBookButton.addEventListener('click', (event) => this.removeBookFromLibrary(event))

        }

    }

    removeAllBooks() {
        let booksSection = document.querySelectorAll('.book-section')
        booksSection.forEach(bookSection => {
            bookSection.remove()
        });
    }

    reloadAllBooks() {
        //To Avoid Book Sequence Number Issue. Reload again
        this.removeAllBooks() // Remove Existing DOM/HTML
        this.displayAllBooks() // Add New DOM/HTML
    }

    getBookDetailsFromForm() {
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

    clearPreviousFormData() {
        document.querySelector('#book-name').value = ''
        document.querySelector('#book-author').value = ''
        document.querySelector('#book-pages').value = ''
        document.querySelector('#book-read').checked = false

    }

    addBookToLibrary(event) {
        event.preventDefault()
        let book = this.getBookDetailsFromForm()

        if (book === null) {
            alert("Enter All the Details")
            return null
        } else if (typeof (book) === 'string') {
            // Set Error Message
            alert(`Enter All the Details : ${book}`)
        } else {
            // See If Book Name Already Exists in Library
            let searchedBook = this.myLibrary.filter(searchBook => (searchBook.name === book.name && searchBook.author === book.author))

            if (searchedBook !== null && searchedBook.length >= 1) {
                alert(`Book Already Exists in Library : ${book.name} by ${book.author}`)
            } else {
                // All Data Looks Goods
                this.myLibrary.push(book)
                this.reloadAllBooks()
                this.clearPreviousFormData()
                this.addBookDialog.close()
            }
        }
    }

    removeBookFromLibrary(event) {
        let bookSequence = event.target.classList.item(1).split("-")[1] - 1
        this.myLibrary.splice(bookSequence, 1) // Remove Book from Library
        //event.target.parentElement.remove() // Remove Book from DOM/HTML

        this.reloadAllBooks()
    }

    handleBookReadCheckbox(event) {
        let bookSequence = event.target.id.split("-")[2] - 1
        let isChecked = event.target.checked

        if (isChecked) {
            // Update Library Array

            this.myLibrary[bookSequence].isRead = true

            // Update DOM/HTML
            event.target.parentElement.classList.remove('not-read')
            event.target.parentElement.classList.add('read')

        } else {
            // Update Library Array
            this.myLibrary[bookSequence].isRead = false

            // Update DOM/HTML
            event.target.parentElement.classList.remove('read')
            event.target.parentElement.classList.add('not-read')

        }

    }
}

// Default Books
let book1 = new Book('Lord Of The Rings', 'JRR Tolkien', 500, false)
let book2 = new Book('Game Of Thrones', 'George RR Martin', 1000, true)
let book3 = new Book('Harry Potter', 'JK Rowling', 800, false)

let library = new Library([book1, book2, book3])
library.displayAllBooks() // Display Default Books
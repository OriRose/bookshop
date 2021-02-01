'use strict'

function onInit() {
    renderBooks()
}


function renderBooks() {
    var books = getBooks()
    var strHTML = '<tr><th>Title</th><th>Price</th><th>Actions</th></tr>';
    books.forEach(function(book){
        strHTML += `<tr><td>${book.name}</td><td>${book.price}</td><td><button onclick="onReadBook('${book.id}')">Read</button><button onclick="onUpdateBook('${book.id}')">Update</button><button onclick="onDeleteBook('${book.id}')">Delete</button></td></tr>`
    });
    document.querySelector('.books-table').innerHTML = strHTML
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function onAddBook() {
    var bookName = prompt('book name?')
    var bookPrice = +prompt('book price?')
    addBook(bookName, bookPrice)
    renderBooks();
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('price?');
    updateBook(bookId, newPrice);
    renderBooks();
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').innerText = book.name
    elModal.querySelector('h6').innerText = book.price +' $'
    elModal.querySelector('span').innerText = book.rate
    elModal.querySelector('p').innerText = book.desc
    elModal.querySelector('.increase-rate').setAttribute ( "onclick" , `onIncreaseRate("${book.id}")`)
    elModal.querySelector('.decrease-rate').setAttribute ( "onclick" , `onDecreaseRate("${book.id}")`)
    elModal.querySelector('img').setAttribute ("src", `img/${book.image}.jpg`)

    elModal.hidden = false;

}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}


function onNextPage() {
    nextPage();
    renderBooks();
}

function onIncreaseRate(bookId){
    increaseRate(bookId);
    onReadBook(bookId)
}

function onDecreaseRate(bookId){
    decreaseRate(bookId)
    onReadBook(bookId)
}
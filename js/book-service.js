'use strict'
const KEY = 'books';
var gBooks;

const PAGE_SIZE = 5;
var gPageIdx = 0;

_createBooks();

function getBooks() {
    var startIdx = gPageIdx*PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length ) {
        gPageIdx = 0;
    }
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)


    _saveBooksToStorage();

}

function addBook(name,price) {
    var book = _createBook(name,price)
    gBooks.unshift(book)
    _saveBooksToStorage();
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}

function updateBook(bookId, newPrice) {
    var book = gBooks.find(function(book){
        return book.id === bookId;
    })
    book.price = newPrice;
    _saveBooksToStorage();
}

function _createBook(name, price) {
    return {
        id: makeId(),
        name: name,
        price: price,
        desc: makeLorem(),
        rate: 0,
        image: getRandomIntInclusive(1,5)
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    
    if (!books || !books.length) {
        books = []
        books.push(_createBook('Learning Laravel', 18.90))
        books.push(_createBook('Beginning with Laravel', 6.65))
        books.push(_createBook('Java for developers', 7.20))
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function increaseRate(bookId) {
    var book = getBookById(bookId);
    if(book.rate<10) book.rate++
}

function decreaseRate(bookId){
    var book = getBookById(bookId);
    if(book.rate>0) book.rate--
}
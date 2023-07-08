import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

import bookList from '../data/books.json' assert { type: 'json' }

const PAGE_SIZE = 5
const BOOK_KEY = 'bookDB'

var gFilterBy = { txt: '', minPrice: 0 }
var gSortBy = { title: 1 }
var gPageIdx

const SEARCH_KEY = 'searchDB'
let gBooksCache = utilService.loadFromStorage(BOOK_KEY) || {}

_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  addReview,
  removeReview,
  getEmptyBook,
  getNextBookId,
  getFilterBy,
  setFilterBy,
  getBookCountByPriceMap,
  getBooks,
  addGoogleBook,
}
window.bookService = bookService

function query() {
  return storageService.query(BOOK_KEY).then((books) => {
    if (gFilterBy.txt) {
      const regex = new RegExp(gFilterBy.txt, 'i')
      books = books.filter((book) => regex.test(book.title))
    }
    if (gFilterBy.minPrice) {
      books = books.filter((book) => book.listPrice >= gFilterBy.minPrice)
    }
    if (gPageIdx !== undefined) {
      const startIdx = gPageIdx * PAGE_SIZE
      books = books.slice(startIdx, startIdx + PAGE_SIZE)
    }
    // if (gSortBy.listPrice !== undefined) {
    //   books.sort((b1, b2) => (b1.listPrice - b2.listPrice) * gSortBy.listPrice)
    // } else if (gSortBy.title !== undefined) {
    //   books.sort((b1, b2) => b1.title.localeCompare(b2.title) * gSortBy.title)
    // }

    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId).then((book) => _setNextPrevBookId(book))
}

function _setNextPrevBookId(book) {
  return storageService.query(BOOK_KEY).then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
    book.nextBookId = books[bookIdx + 1] ? books[bookIdx + 1].id : books[0].id
    book.prevBookId = books[bookIdx - 1] ? books[bookIdx - 1].id : books[books.length - 1].id
    return book
  })
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function addReview(bookId, review) {
  return get(bookId).then((book) => {
    if (!book.reviews) book.reviews = []
    review.id = utilService.makeId()
    book.reviews.push(review)
    return save(book)
  })
}

function removeReview(bookId, reviewId) {
  return get(bookId).then((book) => {
    const idx = book.reviews.findIndex((review) => review.id === reviewId)
    book.reviews.splice(idx, 1)
    return save(book)
  })
}

function getEmptyBook(title = '', minPrice = 0) {
  return { id: '', title, minPrice }
}

function getFilterBy() {
  return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
  if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
  if (filterBy.minPrice !== undefined) gFilterBy.minPrice = filterBy.minPrice
  return gFilterBy
}

function getNextBookId(bookId) {
  return storageService.query(BOOK_KEY).then((books) => {
    var idx = books.findIndex((book) => book.id === bookId)
    if (idx === books.length - 1) idx = -1
    return books[idx + 1].id
  })
}

function getBookCountByPriceMap() {
  return storageService.query(BOOK_KEY).then((books) => {
    const bookCountByPriceMap = books.reduce(
      (map, book) => {
        if (book.minPrice < 120) map.slow++
        else if (book.minPrice < 200) map.normal++
        else map.fast++
        return map
      },
      { slow: 0, normal: 0, fast: 0 }
    )
    return bookCountByPriceMap
  })
}

function getBooks(keyword) {
  if (gBooksCache[keyword]) {
    console.log('Getting from cache')
    return Promise.resolve(gBooksCache[keyword])
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=${keyword}`

  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log('res', res)
      const results = res.items.map((item) => _prepareBookData(item, keyword))
      console.log('results', results)
      gBooksCache[keyword] = results

      utilService.saveToStorage(BOOK_KEY, gBooksCache)
      return results
    })
}

function _prepareBookData(item) {
  return {
    id: item.id,
    title: item.volumeInfo.title,
    authors: item.volumeInfo.authors,
    categories: item.volumeInfo.categories,
    description: item.volumeInfo.description,
    language: item.volumeInfo.language,
    pageCount: item.volumeInfo.pageCount,
    imgUrl: item.volumeInfo.imageLinks?.thumbnail,
  }
}

function addGoogleBook(book) {
  console.log('Added Google Book')
  return storageService.post(BOOK_KEY, book)
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = bookList
    utilService.saveToStorage(BOOK_KEY, books)
  }
}

function _createBook(title, minPrice = 200) {
  const book = getEmptyBook(title, minPrice)
  book.id = utilService.makeId()
  return book
}

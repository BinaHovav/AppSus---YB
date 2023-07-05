import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

// import mailList from '../data/books.json' assert { type: 'json' }
// console.log('bookList', bookList)

const PAGE_SIZE = 5
const EMAIL_KEY = 'emailDB'

var gFilterBy = { txt: '', minPrice: 0 }
var gSortBy = { title: 1 }
var gPageIdx

const SEARCH_KEY = 'searchDB'
// let gBooksCache = utilService.loadFromStorage(BOOK_KEY) || {}
// console.log('gBooksCache', gBooksCache)

_createEmails()

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mr. Bit',
}

export const emailService = {
  query,
  get,
  remove,
  save,
  //   addReview,
  //   removeReview,
  // getEmptyEmail,
  // getNextEmailId,
  getFilterBy,
  setFilterBy,
  //   getBookCountByPriceMap,
  //   getBooks,
  //   addGoogleBook,
}
window.emailService = emailService

function query() {
  return storageService.query(EMAIL_KEY).then((emails) => {
    if (gFilterBy.txt) {
      const regex = new RegExp(gFilterBy.txt, 'i')
      emails = emails.filter((email) => regex.test(email.title))
    }
    if (gFilterBy.minPrice) {
      emails = emails.filter((email) => email.listPrice >= gFilterBy.minPrice)
    }
    if (gPageIdx !== undefined) {
      const startIdx = gPageIdx * PAGE_SIZE
      emails = emails.slice(startIdx, startIdx + PAGE_SIZE)
    }
    // if (gSortBy.listPrice !== undefined) {
    //   books.sort((b1, b2) => (b1.listPrice - b2.listPrice) * gSortBy.listPrice)
    // } else if (gSortBy.title !== undefined) {
    //   books.sort((b1, b2) => b1.title.localeCompare(b2.title) * gSortBy.title)
    // }

    return emails
  })
}

function get(emailId) {
  return storageService.get(EMAIL_KEY, emailId).then((email) => _setNextPrevEmailId(email))
}

// function _setNextPrevEmailId(email) {
//   return storageService.query(EMAIL_KEY).then((emails) => {
//     const emailIdx = emails.findIndex((currEmail) => currEmail.id === email.id)
//     email.nextMailId = emails[emailIdx + 1] ? emails[emailIdx + 1].id : emails[0].id
//     email.prevMailId = emails[emailIdx - 1] ? emails[emailIdx - 1].id : emails[emails.length - 1].id
//     return email
//   })
// }

function remove(emailId) {
  return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
  if (email.id) {
    return storageService.put(EMAIL_KEY, email)
  } else {
    return storageService.post(EMAIL_KEY, email)
  }
}

// function addReview(mailId, review) {
//   return get(bookId).then((book) => {
//     if (!book.reviews) book.reviews = []
//     review.id = utilService.makeId()
//     book.reviews.push(review)
//     return save(book)
//   })
// }

// function removeReview(bookId, reviewId) {
//   return get(bookId).then((book) => {
//     const idx = book.reviews.findIndex((review) => review.id === reviewId)
//     book.reviews.splice(idx, 1)
//     return save(book)
//   })
// }

// function getEmptyMail(title = '', minPrice = 0) {
//   return { id: '', title, minPrice }
// }

function getFilterBy() {
  return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
  if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
  // if (filterBy.minPrice !== undefined) gFilterBy.minPrice = filterBy.minPrice
  return gFilterBy
}

// function getNextEmailId(emailId) {
//   return storageService.query(MAIL).then((emails) => {
//     var idx = emails.findIndex((mail) => email.id === emailId)
//     if (idx === emails.length - 1) idx = -1
//     return emails[idx + 1].id
//   })
// }

// function getBookCountByPriceMap() {
//   return storageService.query(BOOK_KEY).then((books) => {
//     const bookCountByPriceMap = books.reduce(
//       (map, book) => {
//         if (book.minPrice < 120) map.slow++
//         else if (book.minPrice < 200) map.normal++
//         else map.fast++
//         return map
//       },
//       { slow: 0, normal: 0, fast: 0 }
//     )
//     return bookCountByPriceMap
//   })
// }

// function getBooks(keyword) {
//   if (gBooksCache[keyword]) {
//     console.log('Getting from cache')
//     return Promise.resolve(gBooksCache[keyword])
//   }

//   const url = `https://www.googleapis.com/books/v1/volumes?q=${keyword}`

//   return fetch(url)
//     .then((res) => res.json())
//     .then((res) => {
//       console.log('res', res)
//       const results = res.items.map((item) => _prepareBookData(item, keyword))
//       console.log('results', results)
//       gBooksCache[keyword] = results

//       utilService.saveToStorage(BOOK_KEY, gBooksCache)
//       return results
//     })
// }

// function _prepareBookData(item) {
//   return {
//     id: item.id,
//     title: item.volumeInfo.title,
//     authors: item.volumeInfo.authors,
//     categories: item.volumeInfo.categories,
//     description: item.volumeInfo.description,
//     language: item.volumeInfo.language,
//     pageCount: item.volumeInfo.pageCount,
//     imgUrl: item.volumeInfo.imageLinks?.thumbnail,
//   }
// }

// function addGoogleBook(book) {
//   console.log('Added Google Book')
//   return storageService.post(BOOK_KEY, book)
// }

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAIL_KEY)
  if (!emails || !emails.length) {
    const emails = []
    emails.push(_createEmail('Your receipt from Dr. Cohen is ready', 'body body body body', true))
    emails.push(_createEmail('THE HOW TO SLEEP WELL guide is waiting for you here', 'body body body body', true))
    emails.push(_createEmail('Your antivirus is about to expires!', 'body body body body', true))
    emails.push(_createEmail('Your electricity bill is ready', 'body body body body', true))
    emails.push(_createEmail('Sign up for our new "HOW TO LOVE CSS in 4 days" course', 'body body body body', false))
    emails.push(_createEmail('The summer is here', 'body body body body', false))
    emails.push(_createEmail('Your Delivery is on the Way!', 'body body body body', false))
    emails.push(_createEmail('Your next vacation is (not) around the corner', 'body body body body', false))
    emails.push(_createEmail('Buy 3 and get 10 for free', 'body body body body', false))
    emails.push(_createEmail('Coffee Machine sale is over tonight', false))
    utilService.saveToStorage(EMAIL_KEY, emails)
    console.log('emails', emails)
  }
}

function _createEmail(subject, body, isRead) {
  const email = {
    id: utilService.makeId(),
    subject,
    body,
    isRead,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com',
  }
  //   email.id = utilService.makeId()
  return email
}

// function _createMail(title, minPrice = 200) {
//   const mail = getEmptyMail(title, minPrice)
//   mail.id = utilService.makeId()
//   return mail
// }

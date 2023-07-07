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
  getEmptyEmail,
  getNextEmailId,
  getFilterBy,
  setFilterBy,
  getEmailCountByFolderMap,
  loggedinUser,
  //   getBooks,
  //   addGoogleBook,
}
window.emailService = emailService

function query() {
  return storageService.query(EMAIL_KEY).then((emails) => {
    emails = emails.filter((email) => email.folder === 'inbox')

    if (gFilterBy.txt) {
      const regex = new RegExp(gFilterBy.txt, 'i')
      emails = emails.filter((email) => regex.test(email.title))
    }
    // if (gFilterBy.minPrice) {
    // }
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

function _setNextPrevEmailId(email) {
  return storageService.query(EMAIL_KEY).then((emails) => {
    const emailIdx = emails.findIndex((currEmail) => currEmail.id === email.id)
    email.nextMailId = emails[emailIdx + 1] ? emails[emailIdx + 1].id : emails[0].id
    email.prevMailId = emails[emailIdx - 1] ? emails[emailIdx - 1].id : emails[emails.length - 1].id
    return email
  })
}

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

function getEmptyEmail(to = '', from = 'user@appsus.com', subject = '', body = '', sentAt = Date.now()) {
  return { id: '', to, from, subject, body, sentAt }
}

function getFilterBy() {
  return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
  if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
  // if (filterBy.minPrice !== undefined) gFilterBy.minPrice = filterBy.minPrice
  return gFilterBy
}

function getNextEmailId(emailId) {
  return storageService.query(MAIL).then((emails) => {
    var idx = emails.findIndex((mail) => email.id === emailId)
    if (idx === emails.length - 1) idx = -1
    return emails[idx + 1].id
  })
}

function getEmailCountByFolderMap() {
  return storageService.query(EMAIL_KEY).then((emails) => {
    const emailCountByFolderMap = emails.reduce(
      (map, email) => {
        if (email.folder === 'inbox') map.inbox++
        else if (email.folder === 'trash') map.trash++
        // else map.fast++
        return map
      },
      { inbox: 0, trash: 0 }
    )
    console.log('emailCountByFolderMap', emailCountByFolderMap)
    return emailCountByFolderMap
  })
}

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
    const emails = [
      {
        id: utilService.makeId(),
        folder: 'inbox',
        subject: 'Sign up for our new "HOW TO LOVE CSS in 4 days" course',
        body: 'body body body body',
        isRead: false,
        isStar: false,
        sentAt: '',
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',
        subject: 'Your receipt from Dr. Cohen is ready',
        body: 'body body body body',
        isRead: false,
        isStar: false,
        sentAt: '',
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'The HOW TO SLEEP WELL guide is waiting for you here',
        body: 'body body body body',
        isRead: false,
        isStar: false,

        sentAt: '',
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Your antivirus is about to expire!',
        body: 'body body body body',
        isRead: false,
        sentAt: '',
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Your electricity bill is ready',
        body: 'body body body body',
        isRead: false,
        isStar: false,

        sentAt: '',
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'trash',

        subject: 'The summer is here',
        body: 'body body body body',
        isRead: true,
        isStar: false,
        sentAt: '',

        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'trash',

        subject: 'Your Delivery is on the Way!',
        body: 'body body body body',
        isRead: true,
        isStar: false,

        sentAt: '',
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Your next vacation is (not) around the corner',
        body: 'body body body body',
        isRead: true,
        isStar: false,

        sentAt: '',
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',
        isStar: false,

        subject: 'Buy 3 and get 10 for free',
        body: 'body body body body',
        isRead: false,
        sentAt: '',
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',
        isStar: false,

        subject: 'SAVE THE DATE',
        body: 'body body body body',
        isRead: true,
        sentAt: '',
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Your Account Update',
        body: 'body body body body',
        isRead: true,
        isStar: false,

        sentAt: '',
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Your Bank Password',
        body: 'body body body body',
        isRead: true,
        isStar: true,

        sentAt: '',

        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Your pension plan',
        body: 'body body body body',
        isRead: true,
        sentAt: '',
        isStar: false,

        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Important announcement',
        body: 'body body body body',
        isRead: true,
        isStar: false,

        sentAt: '',
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Great news from America',
        body: 'body body body body',
        isRead: true,
        isStar: false,

        sentAt: '',
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'You have a new Facebook request',
        body: 'body body body body',
        isRead: true,
        isStar: false,

        sentAt: '',
        removedAt: null,
        to: 'momo@momo.com',
        from: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'You have a new Facebook request',
        body: 'body body body body',
        isRead: true,
        sentAt: '',
        isStar: false,
        removedAt: null,
        from: 'user@appsus.com',
        to: 'momo@momo.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'You have a new Facebook request',
        body: 'body body body body',
        isRead: true,
        sentAt: '',
        removedAt: null,
        isStar: false,

        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
    ]
    const hoursOffset = 6

    emails.forEach((email, index) => {
      const timestamp = Date.now() - index * (hoursOffset * 60 * 60 * 1000)
      email.sentAt = timestamp
    })

    utilService.saveToStorage(EMAIL_KEY, emails)
    console.log('emails', emails)
  }
}

function _createEmail(subject, body, isRead, sentAt) {
  const email = {
    id: utilService.makeId(),
    subject,
    body,
    isRead,
    sentAt,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com',
    isSelected: false,
  }
  return email
}

// function _createMail(title, minPrice = 200) {
//   const mail = getEmptyMail(title, minPrice)
//   mail.id = utilService.makeId()
//   return mail
// }

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const PAGE_SIZE = 5
const EMAIL_KEY = 'emailDB'

var gFilterBy = { txt: '', minPrice: 0 }
var gSortBy = { title: 1 }
var gPageIdx

const SEARCH_KEY = 'searchDB'

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
    email.nextEmailId = emails[emailIdx + 1] ? emails[emailIdx + 1].id : emails[0].id
    email.prevEmailId = emails[emailIdx - 1] ? emails[emailIdx - 1].id : emails[emails.length - 1].id
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

function getEmptyEmail(to = '', from = 'user@appsus.com', subject = '', body = '', sentAt = Date.now()) {
  return { id: '', to, from, subject, body, sentAt }
}

function getFilterBy() {
  return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
  if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
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
    return emailCountByFolderMap
  })
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAIL_KEY)
  if (!emails || !emails.length) {
    const emails = [
      {
        id: utilService.makeId(),
        folder: 'inbox',
        subject: '"HOW TO LOVE CSS in 4 days" bootcamp',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: false,
        isStar: false,
        sentAt: '',
        removedAt: null,
        from: 'CSS@love.it',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Your delivery is on the way!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: false,
        isStar: false,

        sentAt: '',
        removedAt: null,
        from: 'AliExpress',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Your Delivery Was Sent!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: false,
        isStar: false,

        sentAt: '',
        removedAt: null,
        from: 'AliExpress',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'trash',
        subject: 'Your receipt from Dr. Cohen is ready',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: false,
        isStar: false,
        sentAt: '',
        removedAt: null,
        from: 'drcohen@dentist.com',
        to: 'user@appsus.com',
        isSelected: false,
      },

      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Your antivirus is about to expire!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: false,
        sentAt: '',
        removedAt: null,
        from: 'ESET',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'You have 3 new invitations',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: false,
        sentAt: '',
        removedAt: null,
        from: 'LinkedIn',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: '12 people visited your profile',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: false,
        sentAt: '',
        removedAt: null,
        from: 'LinkedIn',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'רוצה לקבל חשבון חשמל לדוא״ל?',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: false,
        isStar: false,

        sentAt: '',
        removedAt: null,
        from: 'חברת החשמל',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'trash',

        subject: 'The summer is here',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: true,
        isStar: false,
        sentAt: '',

        removedAt: null,
        from: 'daniroop@gmail.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Your Delivery is on the Way!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: true,
        isStar: false,

        sentAt: '',
        removedAt: null,
        from: 'AliExpress',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Your next vacation is (not) around the corner',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: true,
        isStar: false,

        sentAt: '',
        removedAt: null,
        from: 'Booking.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Recommended hotels for you',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: true,
        isStar: false,

        sentAt: '',
        removedAt: null,
        from: 'Booking.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Please visit us again',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: true,
        isStar: false,

        sentAt: '',
        removedAt: null,
        from: 'Booking.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: '2 rooms left in Hilton Eilat',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: true,
        isStar: false,

        sentAt: '',
        removedAt: null,
        from: 'Booking.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',
        isStar: false,

        subject: 'Buy 3 and get 10 for free',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: true,
        sentAt: '',
        removedAt: null,
        from: 'sheker@kolshehu.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',
        isStar: true,

        subject: 'SAVE THE DATE',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: true,
        sentAt: '',
        removedAt: null,
        from: 'save@date.com',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Your Account Update',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: true,
        isStar: false,

        sentAt: '',
        removedAt: null,
        from: 'Facebook',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'You have a new Facebook request',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: true,
        isStar: false,

        sentAt: '',
        removedAt: null,
        to: 'momo@momo.com',
        from: 'Facebook',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'You have a new Facebook request',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: true,
        sentAt: '',
        isStar: false,
        removedAt: null,
        from: 'FACEBOOK',
        to: 'momo@momo.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'You have a new Facebook request',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: true,
        sentAt: '',
        removedAt: null,
        isStar: false,

        from: 'FACEBOOK',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Your Bank Password',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: true,
        isStar: true,

        sentAt: '',

        removedAt: null,
        from: 'Bank Leumi',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'הדו"ח השנתי של חסכון לכל ילד כבר כאן',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: true,
        sentAt: '',
        isStar: false,

        removedAt: null,
        from: 'מנורה מבטחים',
        to: 'user@appsus.com',
        isSelected: false,
      },
      {
        id: utilService.makeId(),
        folder: 'inbox',

        subject: 'Important announcement',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Neque sodales ut etiam sit amet nisl purus. Pretium lectus quam id leo in vitae turpis massa sed. Amet nisl purus in mollis nunc sed id semper risus. Quis commodo odio aenean sed adipiscing diam. Faucibus interdum posuere lorem ipsum dolor sit. Mauris nunc congue nisi vitae. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Massa sed elementum tempus egestas.',
        isRead: true,
        isStar: false,

        sentAt: '',
        removedAt: null,
        from: 'lo@relevanti.com',
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

import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'
import BookAdd from '../cmps/BookAdd.js'

export default {
  name: 'BookIndex',
  template: `

              <!-- <head>
                <link rel="stylesheet" href="./assets/style/mainbook.css" />
              </head> -->
              <section class="book-index">

          <h2 style= "color:red; margin-left:100px">
            This website is under construction.<br>
            Will be ready soon :)
          </h2>
            <BookAdd></BookAdd>
                
            <BookFilter @filter="setFilterBy"/>
            <BookList 
                v-if="books"
                :books="filteredBooks"
                @remove="removeBook" /> 
        </section>

    `,

  created() {
    bookService.query().then((books) => (this.books = books))
    console.log('this.books', this.books)
  },

  data() {
    return {
      books: [],
      filterBy: {},
    }
  },

  methods: {
    removeBook(bookId) {
      bookService
        .remove(bookId)
        .then(() => {
          const idx = this.books.findIndex((book) => book.id === bookId)
          this.books.splice(idx, 1)
          showSuccessMsg('Book removed')
        })
        .catch((err) => {
          showErrorMsg('Cannot remove book')
        })
    },

    saveBook(bookToSave) {
      bookService.save(bookToSave).then((savedBook) => this.books.push(savedBook))
    },
    setFilterBy(filterBy) {
      this.filterBy = filterBy
    },
  },

  computed: {
    filteredBooks() {
      let filteredBooks = this.books
      const regex = new RegExp(this.filterBy.txt, 'i')
      filteredBooks = filteredBooks.filter((book) => regex.test(book.title))

      if (this.filterBy.price) {
        filteredBooks = filteredBooks.filter((book) => book.listPrice.amount <= this.filterBy.price)
      }
      return filteredBooks
    },
  },
  components: {
    BookFilter,
    BookList,
    BookAdd,
  },
}

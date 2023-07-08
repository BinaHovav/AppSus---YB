import { bookService } from '../services/book.service.js'
import AddReview from '../cmps/AddReview.js'
import ReviewList from '../cmps/ReviewList.js'
// console.log('addReview', AddReview)

export default {
  template: `
    <section v-if="book" class="book-details">
        <!-- <img :src="imgSrc" alt=""> -->
        <RouterLink :to="'/book/' + book.nextBookId">Next Book</RouterLink> |
        <RouterLink :to="'/book/' + book.prevBookId">Prev Book</RouterLink> 

        <h2>{{ book.title }}</h2>
        <img :src="book.thumbnail" >

        <h3 style="color: darkRed; font-size:1.6em"> {{ displayIfVintage }} </h3>
        <h3 style="color: darkRed; font-size:1.6em"> {{ displayReadingLevel }} </h3>

        <h3>Author: {{ book.authors.join(', ') }}</h3>
        <h3>Categories: {{ book.categories.join(', ') }}</h3>
        <h3>Description: {{ book.description }}</h3>
        <h3>Language: {{ book.language }}</h3>
        <h3> Pages: {{ book.pageCount }}</h3>
        <h3>Date: {{ book.publishedDate }}</h3>
        <!-- <LongTxt :txt="txt"> -->
        <ReviewList @remove="removeReview" :reviews="book.reviews"/>
        <AddReview @add-review="addReview"></AddReview>
        <RouterLink to="/book">Back to List</RouterLink>

    </section>
    `,

  data() {
    return {
      book: null,
      txt: '',
    }
  },
  created() {
    const { bookId } = this.$route.params
    bookService
      .get(bookId)
      .then((book) => {
        this.book = book
      })
      .catch((err) => {
        alert('Cannot load book')
        this.$router.push('/book')
      })
  },
  methods: {
    loadBook() {
      const { bookId } = this.$route.params
      bookService
        .get(bookId)
        .then((book) => {
          this.book = book
        })
        .catch((err) => {
          alert('Cannot load book')
          this.$router.push('/book')
        })
    },

    addReview(review) {
      bookService.addReview(this.book.id, review).then((book) => (this.book = book))
    },
    removeReview(reviewId) {
      bookService.removeReview(this.book.id, reviewId).then((book) => (this.book = book))
    },
  },

  watch: {
    bookId() {
      this.loadBook()
    },
  },

  computed: {
    displayReadingLevel() {
      if (this.book.pageCount >= 500) {
        return 'Serious Reading'
      } else if (this.book.pageCount > 100 && this.book.pageCount < 500) {
        return 'Descent Reading'
      } else if (this.book.pageCount <= 100) {
        return 'Light Reading'
      }
    },
    displayIfVintage() {
      if (this.book.publishedDate < 2013) {
        return 'VINTAGE'
      } else return 'NEW'
    },
    bookId() {
      return this.$route.params.bookId
    },
  },
  components: {
    AddReview,
    ReviewList,
  },
}

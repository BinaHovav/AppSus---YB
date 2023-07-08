export default {
  name: 'BookPreview',
  props: ['book'],
  template: `
        <article class="book-preview">
            <img :src="book.thumbnail" >
            <h2>{{ book.title }}</h2>

            <h3 :class=showColorByPrice >Price: 
                <span>{{ currency }}</span>
                <span>{{ price }}</span> 
            </h3>
            <span v-if="isOnSale" class="on-sale-tag">On Sale!</span>
            
            <div className="actions">
                <RouterLink :to="'/book/' + book.id">Details</RouterLink> 
                <RouterLink :to="'/book/edit/' + book.id">Edit</RouterLink>
            </div>
          </article>
    `,

  computed: {
    showColorByPrice() {
      if (this.book.listPrice.amount >= 150) {
        return 'red'
      } else if (this.book.listPrice.amount < 50) {
        return 'green'
      }
    },
    currency() {
      let curr = ''
      const type = this.book.listPrice.currencyCode
      //check for shorter way maybe intl func
      switch (type) {
        case 'EUR':
          curr = '€'
          break
        case 'USD':
          curr = '$'
          break
        case 'ILS':
          curr = '₪'
          break
        default:
          curr = '$'
      }
      return curr
    },
    price() {
      return this.book.listPrice.amount
    },
    isOnSale() {
      return this.book.listPrice.isOnSale
    },
  },
}

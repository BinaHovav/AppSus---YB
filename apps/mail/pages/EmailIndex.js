import { emailService } from '../services/email.service.js'
// import { showSuccessMsg, showErrorMsg } from '/services/event-bus.service.js'

import EmailFilter from '/apps/mail/cmps/EmailFilter.js'

import EmailList from '/apps/mail/cmps/EmailList.js'

export default {
  name: 'emailIndex',
  template: `
        <section class="email-index">
            <!-- <RouterLink to="/email/edit" class="add-email">Add Email</RouterLink>  -->
                            
            <EmailFilter @filter="setFilterBy"/>
            <EmailList 
                v-if="emails"
                :emails="filteredEmails"/>
                <!-- @remove="removeEmail"  -->
                
        </section>
    `,

  data() {
    return {
      emails: [],
      selectedEmail: null,
      filterBy: {},
    }
  },
  created() {
    emailService.query().then((emails) => (this.emails = emails))
    console.log('this.emails', this.emails)
  },

  methods: {
    setFilterBy(filterBy) {
      this.filterBy = filterBy
    },
  },

  computed: {
    filteredEmails() {
      let filteredEmails = this.emails
      const regex = new RegExp(this.filterBy.txt, 'i')
      filteredEmails = filteredEmails.filter((email) => regex.test(email.subject))

      // if (this.filterBy.price) {
      //   filteredBooks = filteredBooks.filter((book) => book.listPrice.amount <= this.filterBy.price)
      // }
      return filteredEmails
    },
  },
  components: {
    EmailFilter,
    EmailList,
  },
}

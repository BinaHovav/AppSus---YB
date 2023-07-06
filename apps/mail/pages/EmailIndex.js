import { emailService } from '../services/email.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import EmailFilter from '../cmps/EmailFilter.js'
import EmailList from '../cmps/EmailList.js'
import EmailNavbar from '../cmps/EmailNavbar.js'

export default {
  name: 'emailIndex',
  props: ['email'],

  template: `
        <section class="email-index">
          <button @click="onComposeEmail">Compose</button>
            <!-- <RouterLink to="/email/edit" class="add-email">Add Email</RouterLink>  -->
                            
            <EmailFilter @filter="setFilterBy"/>
            <EmailNavbar></EmailNavbar>
            <!-- <EmailList 
                v-if="emails"
                :emails="filteredEmails"
                @markAsRead="markAsRead"/> -->
                <!-- @remove="removeEmail"  -->
            <RouterView :emails="filteredEmails"
             @remove="removeEmail"
             @updateEmail="updateEmail"
             />
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
    // console.log('this.emails', this.emails)
  },

  methods: {
    setFilterBy(filterBy) {
      this.filterBy = filterBy
    },

    onComposeEmail() {
      this.$emit('compose')
      console.log('compose')
    },

    updateEmail(email) {
      emailService.save(email).then((updatedEmail) => {
        const emailIdx = this.emails.findIndex((email) => email.id === updatedEmail.id)
        this.emails.splice(emailIdx, 1, updatedEmail)
      })
    },

    removeEmail(emailId) {
      console.log('removing')
      console.log('emailId', emailId)
      emailService
        .remove(emailId)
        .then(() => {
          const idx = this.emails.findIndex((email) => email.id === emailId)
          this.emails.splice(idx, 1)
          showSuccessMsg('Email removed to Trash')
        })
        .catch((err) => {
          showErrorMsg('Cannot remove email')
        })
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
    EmailNavbar,
  },
}

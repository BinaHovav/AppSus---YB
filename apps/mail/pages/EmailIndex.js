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
            <EmailList 
                v-if="emails"
                :emails="filteredEmails"
                @markAsRead="markAsRead"/>
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

    markAsRead(emailId) {
      console.log('mark as read')
      emailService
        .get(emailId)
        .then((email) => {
          if (!email.isRead) {
            email.isRead = true
            return emailService.save(email)
          }
        })
        .then((savedEmail) => {
          console.log('savedEmail', savedEmail)
          showSuccessMsg('Email marked as Read')
          // this.$router.push('/mail')
        })
        .catch((err) => {
          showErrorMsg('Cannot mark email as read')
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

import { emailService } from '../services/email.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import EmailFilter from '../cmps/EmailFilter.js'
import EmailList from '../cmps/EmailList.js'
import EmailNavbar from '../cmps/EmailNavbar.js'

export default {
  name: 'emailIndex',
  props: ['email'],
  emits: ['updateEmail'],

  template: `
        <section class="email-index">
          <button @click="onComposeEmail">Compose</button>
            <!-- <RouterLink to="/email/edit" class="add-email">Add Email</RouterLink>  -->
                            
            <EmailFilter @filter="setFilterBy"/>
            <EmailNavbar @selectFolder="setFolder" />
            <!-- <EmailList 
                v-if="emails"
                :emails="filteredEmails"
                @markAsRead="markAsRead"/> -->
                <!-- @remove="removeEmail"  -->
            <RouterView :emails="filteredEmails"
             @updateEmail="updateEmail"
             />
        </section>
    `,

  data() {
    return {
      emails: [],
      selectedEmail: null,
      filterBy: {},
      folder: 'Inbox',
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
    setFolder(folder) {
      this.folder = folder
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
  },

  computed: {
    filteredEmails() {
      let filteredEmails = this.emails
      const regex = new RegExp(this.filterBy.txt, 'i')
      filteredEmails = filteredEmails.filter((email) => regex.test(email.subject))

      switch (this.folder) {
        case 'Inbox':
          filteredEmails = filteredEmails.filter((email) => email.to === emailService.loggedinUser.email && !email.removedAt)
          break
        case 'Sent':
          filteredEmails = filteredEmails.filter((email) => email.from === emailService.loggedinUser.email && !email.removedAt && email.sentAt)
          break
        case 'Starred':
          filteredEmails = filteredEmails.filter((email) => email.isStarred)
          break
        case 'Trash':
          filteredEmails = filteredEmails.filter((email) => email.removedAt)
          break
        case 'Draft':
          filteredEmails = filteredEmails.filter((email) => email.from === emailService.loggedinUser.email && !email.sentAt)
          break
      }
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

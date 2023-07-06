import { emailService } from '../services/email.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import EmailFilter from '../cmps/EmailFilter.js'
import EmailList from '../cmps/EmailList.js'
import EmailNavbar from '../cmps/EmailNavbar.js'
import EmailCompose from '../cmps/EmailCompose.js'

export default {
  name: 'emailIndex',
  props: ['email'],
  emits: ['selectFolder', 'updateEmail'],

  template: `
        <section class="email-index">
          <!-- this is the compose box -->
             <div class="compose-container" v-if="isComposeOpen"> 
              <EmailCompose @closeCompose="closeCompose" />
            </div>

           <!-- this is the compose button -->
           <div class="compose-button-container">
                <button @click="openCompose" class="compose-button">
                   <span class="material-icons">mode_edit</span>
                     Compose
                </button>
          </div>


            <EmailFilter @filter="setFilterBy"/>
            <EmailNavbar @selectFolder="setFolder" :unreadMailsCount="unreadMailsCount" />
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
      folder: 'inbox',
      isComposeOpen: false,
    }
  },
  created() {
    emailService.query().then((emails) => (this.emails = emails))
    // console.log('this.emails', this.emails)
  },

  methods: {
    openCompose() {
      this.isComposeOpen = true
    },
    closeCompose() {
      this.isComposeOpen = false
    },
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
        case 'inbox':
          filteredEmails = filteredEmails.filter((email) => email.to === emailService.loggedinUser.email && !email.removedAt)
          break
        case 'sent':
          filteredEmails = filteredEmails.filter((email) => email.from === emailService.loggedinUser.email && !email.removedAt && email.sentAt)
          break
        case 'starred':
          filteredEmails = filteredEmails.filter((email) => email.isStarred)
          break
        case 'trash':
          filteredEmails = filteredEmails.filter((email) => email.removedAt)
          break
        case 'draft':
          filteredEmails = filteredEmails.filter((email) => email.from === emailService.loggedinUser.email && !email.sentAt)
          break
      }
      // if (this.filterBy.price) {
      //   filteredBooks = filteredBooks.filter((book) => book.listPrice.amount <= this.filterBy.price)
      // }
      return filteredEmails
    },
    unreadMailsCount() {
      return this.emails.filter((email) => email.to === emailService.loggedinUser.email && !email.removedAt && !email.isRead).length
    },
  },
  components: {
    EmailFilter,
    EmailList,
    EmailNavbar,
    EmailCompose,
  },
}

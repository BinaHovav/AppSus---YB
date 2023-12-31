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
              <EmailCompose @closeForm="closeForm"
                            @sendEmail="sendEmail($event)"
                            @saveDraft="saveDraft($event)" />
            </div>

           <!-- this is the compose button -->
           
           <div style="display: flex;">
             <div style="display: flex; flex-direction: column; padding-left:30px; ">
               <div class="compose-button-container">
                 <button @click="openCompose" class="compose-button">
                   <span class="material-icons">mode_edit_outline</span>
                   Compose
                  </button>
                </div>
                <EmailNavbar @selectFolder="setFolder"  :unreadMailsCount="unreadMailsCount" />
              </div>  
              
              <div style="display: flex; flex-direction: column; padding-left:10px">
                   <EmailFilter @filter="setFilterBy"/>
                   <RouterView :emails="filteredEmails"
                                @updateEmail="updateEmail"
                                @removeEmail="removeEmail"/>
              </div>
            </div>
             
        </section>
    `,

  data() {
    return {
      emails: [],
      selectedEmail: null,
      filterBy: {},
      folder: 'inbox',
      isComposeOpen: false,
      currentTime: null,
      newEmail: null,
    }
  },
  created() {
    emailService.query().then((emails) => (this.emails = emails))
    console.log('this.newEmail', this.newEmail)
  },

  methods: {
    openCompose() {
      this.isComposeOpen = true
    },
    closeForm() {
      this.isComposeOpen = false
    },
    setFilterBy(filterBy) {
      this.filterBy = filterBy
    },
    setFolder(folder) {
      this.folder = folder
    },
    sendEmail(email) {
      this.newEmail = email

      emailService.save(this.newEmail).then((savedEmail) => {
        this.emails.push(savedEmail)
        // this.updateEmail(email)
        this.closeForm()
      })
      showSuccessMsg('Mail Sent Succefully!')
    },
    saveDraft(email) {
      this.newEmail = email

      emailService.save(this.newEmail).then((savedEmail) => {
        this.emails.push(savedEmail)
        this.closeForm()
      })
      showSuccessMsg('Mail Saved in Draft')
    },
    updateEmail(email) {
      emailService.save(email).then((updatedEmail) => {
        const emailIdx = this.emails.findIndex((email) => email.id === updatedEmail.id)
        this.emails.splice(emailIdx, 1, updatedEmail)
      })
    },
    removeEmail(emailId) {
      emailService.remove(emailId).then(() => {
        const emailIdx = this.emails.findIndex((email) => email.id === emailId)
        this.emails.splice(emailIdx, 1)
      })
      showSuccessMsg('Mail Removed Forever')
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
          filteredEmails = filteredEmails.filter((email) => email.isStar)
          break
        case 'trash':
          filteredEmails = filteredEmails.filter((email) => email.removedAt)
          break
        case 'draft':
          filteredEmails = filteredEmails.filter((email) => email.from === emailService.loggedinUser.email && !email.sentAt)
          break
      }
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

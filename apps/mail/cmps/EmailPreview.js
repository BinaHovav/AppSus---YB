import { emailService } from '../services/email.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
  name: 'EmailPreview',
  props: ['email'],
  template: `
             <RouterLink :to="'/mail/' + email.id">
                      <article :class="{'email-preview': true,
                                      'unread-email': !email.isRead,
                                       'read-email': email.isRead}">

                          <i class="material-icons star" 
                          :class="['star', colorStar(email)]"
                          @click.stop.prevent="onStarEmail(email)">
                          {{ email.isStar ? 'star' : 'star_outline' }}
                          </i>

                    <h2 class="from-preview">{{ email.from }} </h2>
                    <div class="content-preview"> 
                       <span class="subject-preview">{{ email.subject }}</span>
                       <span class="body-preview">{{ email.body }}</span>
                    </div>
                    <div class="actions">
                       <span class="material-icons-outlined" >archive</span>
                       <span class="material-icons-outlined" @click.stop.prevent="onRemoveEmail(email)">delete</span>
                       <span class="material-icons-outlined" @click.stop.prevent="onToggleIsRead(email)">{{ email.isRead ? 'mail' : 'drafts' }}</span>
                    </div>
                       <h2 class="date-preview">{{ formatDate(email.sentAt) }}</h2>
                  </article>   
              </RouterLink> 
                   `,

  data() {
    return {
      starredEmails: [],
    }
  },

  created() {},

  methods: {
    onToggleIsRead(email) {
      email.isRead = !email.isRead
    },

    onRemoveEmail(email) {
      if (!email.removedAt) {
        const emailToRemove = JSON.parse(JSON.stringify(email))
        emailToRemove.removedAt = Date.now()
        this.$emit('updateEmail', emailToRemove)
        showSuccessMsg('Mail moved to trash')
      } else {
        this.$emit('removeEmail', email.id)
      }
    },

    formatDate(receivedAt) {
      const sentDate = new Date(receivedAt)
      const currentDate = new Date()
      const options = { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'short' }

      if (sentDate.toDateString() === currentDate.toDateString()) {
        return sentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })
      } else {
        return sentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }
    },
    onStarEmail(email) {
      const emailToStar = JSON.parse(JSON.stringify(email))
      emailToStar.isStar = !emailToStar.isStar

      if (emailToStar.isStar) {
        this.starredEmails.push(emailToStar.id)
      } else {
        const idx = this.starredEmails.indexOf(emailToStar.id)
        if (idx !== -1) {
          this.starredEmails.splice(idx, 1)
        }
      }
      this.$emit('updateEmail', emailToStar)
      showSuccessMsg('Mail Starred')
    },
  },
  computed: {
    colorStar() {
      return (email) => {
        if (email.isStar) {
          return 'gold'
        }
        return ''
      }
    },
  },
}

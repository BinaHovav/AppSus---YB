import { emailService } from '../services/email.service.js'

export default {
  name: 'EmailPreview',
  props: ['email'],
  template: `
             <RouterLink :to="'/mail/' + email.id">
                <article :class="{'email-preview': true,
                                 'unread-email': !email.isRead,
                                 'read-email': email.isRead}">
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
      // emailToEdit: emailService.save(),
    }
  },

  created() {},

  methods: {
    onToggleIsRead(email) {
      email.isRead = !email.isRead
    },

    onRemoveEmail(email) {
      console.log('remove')
      console.log('email', email)
      const emailToRemove = JSON.parse(JSON.stringify(email))
      emailToRemove.removedAt = Date.now()
      console.log('emailToRemove', emailToRemove)
      this.$emit('updateEmail', emailToRemove)
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
  },
  computed() {},
}

import EmailPreview from './EmailPreview.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
  name: 'EmailList',
  props: ['emails'],
  template: `
                <section class="email-list">
                   <ul>
                     <li v-for="email in emails" :key="email.id">
                       <i class="material-icons star" 
                          :class="['star', colorStar(email)]"
                          @click.stop.prevent="onStarEmail(email)">
                          {{ email.isStar ? 'star' : 'star_outline' }}
                      </i>
                        <EmailPreview :email="email" 
                          @click="onMarkAsRead(email)" 
                          @updateEmail="onUpdateEmail"
                          @removeEmail="onRemoveEmail"/>
                     </li>
                   </ul>
                 </section>
    `,

  data() {
    return {
      starredEmails: [],
    }
  },

  watch: {
    emails: {
      immediate: true,
      handler(emailList) {},
    },
  },

  created() {},

  methods: {
    onMarkAsRead(email) {
      const emailToSave = JSON.parse(JSON.stringify(email))
      emailToSave.isRead = true
      this.$emit('updateEmail', emailToSave)
    },

    onUpdateEmail(email) {
      this.$emit('updateEmail', email)
    },
    onRemoveEmail(emailId) {
      this.$emit('removeEmail', emailId)
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
      showSuccessMsg('Mail Starred Succefully!')
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

  components: {
    EmailPreview,
  },
}

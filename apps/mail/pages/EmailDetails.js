import { emailService } from '../services/email.service.js'
import EmailList from '../cmps/EmailList.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
  name: 'EmailDetails',
  // props: ['email'],
  template: `
    <section v-if="email" class="email-details">
    <div class="details-header">
      <p> From: {{email.from}}</p>
      <p> To: Me</p>
      <a class="material-icons-outlined trash" @click="onRemoveEmail(email)">delete</a>
      </div>  
      <div class="email-body">
           <h2>{{ email.subject }}</h2>
           <p>{{ email.body }}</p>
        </div>
<!--         
        <div class="next-prev-buttons">
          <RouterLink :to="'/mail/' + email.nextEmailId">Next Email</RouterLink> 
          <RouterLink :to="'/mail/' + email.prevEmailId">Prev Email</RouterLink> 
        </div> -->
        <RouterLink to="/mail/inbox">Back to Inbox</RouterLink>

    </section>
    `,

  data() {
    return {
      email: null,
    }
  },
  created() {
    this.loadEmail()
  },
  methods: {
    loadEmail() {
      const { emailId } = this.$route.params
      console.log('emailId', emailId)
      emailService
        .get(emailId)
        .then((email) => {
          this.email = email
          // this.$router.push('/mail/:emailId')
        })
        .catch((err) => {
          // alert('Cannot load email methods')
          // this.$router.push('/mail')
        })
    },
    onRemoveEmail(email) {
      if (!email.removedAt) {
        const emailToRemove = JSON.parse(JSON.stringify(email))
        emailToRemove.removedAt = Date.now()
        this.$emit('updateEmail', emailToRemove)
        showSuccessMsg('Mail moved to trash')
        this.$router.push('/mail/inbox')
      }
    },
  },

  watch: {
    emailId() {
      this.loadEmail()
    },
  },

  computed: {
    emailId() {
      return this.$route.params.emailId
    },
  },
  components: {
    EmailList,
  },
}

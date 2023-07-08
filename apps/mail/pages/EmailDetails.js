import { emailService } from '../services/email.service.js'
import EmailList from '../cmps/EmailList.js'

export default {
  name: 'EmailDetails',
  // props: ['email'],
  template: `
    <section v-if="email" class="email-details">
        <p> From: {{email.from}}</p>
        <p> To: Me</p>
        <div class="email-body">
           <h2>{{ email.subject }}</h2>
           <p>{{ email.body }}</p>
        </div>
        
        <div class="next-prev-buttons">
          <RouterLink :to="'/mail/' + email.nextEmailId">Next Email</RouterLink> 
          <RouterLink :to="'/mail/' + email.prevEmailId">Prev Email</RouterLink> 
        </div>
        <RouterLink to="/mail/inbox">Back to Inbox</RouterLink>

    </section>
    `,

  data() {
    return {
      email: null,
    }
  },
  created() {
    const { emailId } = this.$route.params
    emailService
      .get(emailId)
      .then((email) => {
        this.email = email
      })
      .catch((err) => {
        alert('Cannot load email')
        // this.$router.push('/mail')
      })
  },
  methods: {
    // loadEmail() {
    //   const { emailId } = this.$route.params
    //   emailService
    //     .get(emailId)
    //     .then((email) => {
    //       this.email = email
    //     })
    //     .catch((err) => {
    //       alert('Cannot load email')
    //       this.$router.push('/mail')
    //     })
    // },
  },

  watch: {
    // emailId() {
    //   this.loadEmail()
    // },
  },

  computed: {
    // emailId() {
    //   return this.$route.params.emailId
    // },
  },
  components: {
    EmailList,
  },
}

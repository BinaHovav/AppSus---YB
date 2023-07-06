import { emailService } from '../services/email.service.js'

export default {
  name: 'EmailDetails',
  // props: ['email'],
  template: `
    <section v-if="email" class="email-details">
        <!-- <img :src="imgSrc" alt=""> -->
        <RouterLink :to="'/mail/' + email.nextEmailId">Next Email</RouterLink> |
        <RouterLink :to="'/mail/' + email.prevEmailId">Prev Email</RouterLink> 

        <h2>{{ email.subject }}</h2>
        <!-- <img :src="book.thumbnail" > -->

        <!-- <h3 style="color: darkRed; font-size:1.6em"> {{ displayIfVintage }} </h3>
        <h3 style="color: darkRed; font-size:1.6em"> {{ displayReadingLevel }} </h3> -->

        <h3>{{ email.body }}</h3>
        <!-- <LongTxt :txt="txt"> -->

        <RouterLink to="/mail/inbox">Back to Inbox</RouterLink>

    </section>
    `,

  data() {
    return {
      email: null,
    }
  },
  created() {
    console.log('details')
    const { emailId } = this.$route.params
    emailService
      .get(emailId)
      .then((email) => {
        this.email = email
      })
      .catch((err) => {
        alert('Cannot load email')
        this.$router.push('/mail')
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
  components: {},
}

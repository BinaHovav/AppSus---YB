import EmailPreview from './EmailPreview.js'

export default {
  name: 'EmailList',
  props: ['emails'],
  template: `
                <section class="email-list">
                   <ul>
                     <li v-for="email in emails" :key="email.id">
                        <i class="material-icons star" :class="starClass(email)" @click.stop.prevent="onStarEmail(email)">
                              star_rate
                        </i>   
                        <EmailPreview :email="email" 
                          @click="onMarkAsRead(email)" 
                          @updateEmail="removeEmail"/>
                     </li>
                   </ul>
                 </section>
    `,

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

    removeEmail(email) {
      this.$emit('updateEmail', email)
    },

    onStarEmail(email) {
      console.log('star')

      const emailToStar = JSON.parse(JSON.stringify(email))
      emailToStar.isStar = true
      console.log('emailToStar', emailToStar)
      setTimeout(() => {
        console.log('this.emails', this.emails)
      }, 2000)

      this.$emit('updateEmail', email)
    },
  },

  computed: {
    starClass() {
      return (email) => ({
        star: email.isStarred,
      })
    },
  },

  components: {
    EmailPreview,
  },
}

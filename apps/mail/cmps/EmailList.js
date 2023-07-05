import EmailPreview from './EmailPreview.js'

export default {
  name: 'EmailList',
  props: ['emails'],
  template: `
        <section class="email-list">
            <ul>
                <li v-for="email in emails" :key="email.id">
                    <EmailPreview :email="email" @click="onMarkAsRead(email.id)"/>
                    <!-- <section class="actions">
                        <button @click="onRemoveEmail(email.id)">x</button>
                    </section> -->
                </li>
            </ul>
        </section>
    `,

  watch: {
    emails: {
      immediate: true,
      handler(emailList) {
        console.log('emailList', emailList)
      },
    },
  },

  created() {
    console.log('this.emails', this.emails)
  },

  methods: {
    onMarkAsRead(emailId) {
      this.$emit('markAsRead', emailId)
    },
    onRemoveEmail(emailId) {
      this.$emit('remove', emailId)
    },
  },
  components: {
    EmailPreview,
  },
}

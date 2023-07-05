import EmailPreview from './EmailPreview.js'
export default {
  name: 'EmailList',
  props: ['emails'],
  template: `
        <section class="email-list">
            <ul>
                <li v-for="email in emails" :key="email.id">
                    <EmailPreview :email="email"/>
                    <!-- <section class="actions">
                        <button @click="onRemoveEmail(email.id)">x</button>
                    </section> -->
                </li>
            </ul>
        </section>
    `,
  methods: {
    onRemoveEmail(emailId) {
      this.$emit('remove', emailId)
    },
  },
  components: {
    EmailPreview,
  },
}

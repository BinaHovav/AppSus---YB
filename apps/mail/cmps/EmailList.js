import EmailPreview from './EmailPreview.js'

export default {
  name: 'EmailList',
  props: ['emails'],
  template: `
                <section class="email-list">
                   <div class="email-count">Unread Emails: {{ unreadEmailCount }}</div>
                   <ul>
                     <li v-for="email in emails" :key="email.id">
                           <input type="checkbox"
                                  v-model="email.isSelected" 
                                  @change="onCheckboxChange(email)" />
                         <EmailPreview :email="email" 
                                        @click="onMarkAsRead(email.id)" 
                                        @checkbox-change="onCheckboxChange(email)"
                                         />
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
    onMarkAsRead(emailId) {
      this.$emit('markAsRead', emailId)
    },
    onCheckboxChange(emailId) {
      console.log(emailId)
      this.$emit('checkbox-change', emailId)
    },
    onRemoveEmail(emailId) {
      this.$emit('remove', emailId)
    },
  },

  computed: {
    unreadEmailCount() {
      return this.emails.filter((email) => !email.isRead).length
    },
  },

  components: {
    EmailPreview,
  },
}

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
                                        @click="onMarkAsRead(email)" 
                                        @checkbox-change="onCheckboxChange(email)"
                                        @remove="$emit('remove', email.id)"
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
    onMarkAsRead(email) {
      const emailToSave = JSON.parse(JSON.stringify(email))
      emailToSave.isRead = true
      this.$emit('updateEmail', emailToSave)
    },
    onCheckboxChange(emailId) {
      console.log(emailId)
      this.$emit('checkbox-change', emailId)
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

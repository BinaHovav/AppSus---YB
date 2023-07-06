import EmailPreview from './EmailPreview.js'

export default {
  name: 'EmailList',
  props: ['emails'],
  template: `
                <section class="email-list">
                   <ul>
                     <li v-for="email in emails" :key="email.id">
                           <input type="checkbox"
                                  v-model="email.isSelected" 
                                  @change="onCheckboxChange(email)" />
                         <EmailPreview :email="email" 
                                        @click="onMarkAsRead(email)" 
                                        @checkbox-change="onCheckboxChange(email)"
                                        @updateEmail="removeEmail"
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

    removeEmail(email) {
      console.log('email', email)
      // const emailToRemove = JSON.parse(JSON.stringify(email))
      // emailToRemove.folder = 'trash'

      this.$emit('updateEmail', email)
    },
  },

  computed: {},

  components: {
    EmailPreview,
  },
}

export default {
  name: 'EmailCompose',
  props: ['emails'],

  template: `
                <section class="form-container">
                     <div class="form-header">
                      <p>New Message</p>
                         <button class="close-compose" @click="onCloseCompose">X</button>
                     </div>
                  <form class="email-compose">
                     <div class="form-group">
                        <label for="to"  >{{formHeaderText}}</label>
                        <input class="email-input" @click="clearHeaderLabel" type="text" id="to" v-model="email.to">
                      </div>
                     <div class="form-group">
                        <label for="subject" >{{formSubjectText}}</label>
                       <input class="email-input" @click="clearSubjectLabel" type="text" id="subject" v-model="email.subject">
                     </div>
                     <div class="form-group">
                       <label for="body"></label>
                       <textarea id="body" rows="5" v-model="email.body"></textarea>
                     </div>
                  <div class="send-compose form-actions">
                    <button @click="onSendEmail(email)" type="submit">Send</button>
                  </div>
                </form>
              </section>
  `,

  data() {
    return {
      email: {
        to: '',
        from: 'user@appsus.com',
        subject: '',
        body: '',
        sentAt: null,
      },
      formHeaderText: 'Recipients',
      formSubjectText: 'Subject',
    }
  },

  methods: {
    onCloseCompose() {
      console.log('close')
      this.$emit('closeForm')
    },
    onSendEmail() {
      console.log('sendCompose')
      const sentEmail = JSON.parse(JSON.stringify(this.email))
      sentEmail.sentAt = Date.now()
      this.$emit('sendEmail', sentEmail)
    },
    onSaveDraft() {},

    clearHeaderLabel() {
      this.formHeaderText = ''
    },
    clearSubjectLabel() {
      this.formSubjectText = ''
    },
  },
}

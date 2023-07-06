export default {
  name: 'EmailCompose',
  props: ['emails'],

  template: `
    <section >
      <button class="close-compose" @click="onCloseCompose">X</button>
    <form class="email-compose">
      <div class="form-group">
        <label for="to">To:</label>
        <input type="text" id="to" v-model="to" >
      </div>
      <div class="form-group">
        <label for="subject">Subject:</label>
        <input type="text" id="subject" v-model="subject" >
      </div>
      <div class="form-group">
        <label for="body">Body:</label>
        <textarea id="body" rows="5" v-model="body" ></textarea>
      </div>
      <div class="send-compose form-actions">
        <button @click="onSendEmail()" type="submit">Send</button>
      </div>
    </form>
  </section>
  `,

  data() {
    return {
      to: '',
      subject: '',
      body: '',
      time: Date.now(),
    }
  },

  methods: {
    onCloseCompose() {
      console.log('close')
    },
    onSendEmail() {
      console.log('sendCompose')
      this.$emit('sendEmail', this.time)
    },
  },
}

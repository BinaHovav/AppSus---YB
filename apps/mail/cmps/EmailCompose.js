export default {
  name: 'EmailCompose',

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
      <div class="send-compose" class="form-actions">
        <button type="submit">Send</button>
      </div>
    </form>
  </section>
  `,

  methods: {
    onCloseCompose() {
      console.log('close')
    },
  },
}

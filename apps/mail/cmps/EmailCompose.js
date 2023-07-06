export default {
  name: 'EmailCompose',

  template: `
    <div class="email-compose">
    <form>
      <button @click="onCloseCompose">X</button>
      <div class="form-group">
        <label for="to">To:</label>
        <input type="text" id="to" v-model="to" required>
      </div>
      <div class="form-group">
        <label for="subject">Subject:</label>
        <input type="text" id="subject" v-model="subject" required>
      </div>
      <div class="form-group">
        <label for="body">Body:</label>
        <textarea id="body" rows="5" v-model="body" required></textarea>
      </div>
      <div class="form-actions">
        <button type="submit">Send</button>
      </div>
    </form>
  </div>
  `,

  methods: {
    onCloseCompose() {
      console.log('close')
    },
  },
}

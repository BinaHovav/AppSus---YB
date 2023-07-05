export default {
  name: 'emailPreview',
  props: ['email'],
  template: `
            <article :class="{'email-preview': true, 'unread-email': !email.isRead}">
              <h2>{{ email.subject }}</h2>
              <h2>{{ email.body }}</h2>
              <h3 class="date-preview">{{ email.sentAt }}</h3>
              <div className="actions">
                  <!-- <RouterLink :to="'/email/' + email.id">Details</RouterLink>  -->
                  <!-- <RouterLink :to="'/email/edit/' + email.id">Edit</RouterLink> -->
              </div>
            </article>
      `,

  computed: {},
}

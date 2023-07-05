export default {
  name: 'emailPreview',
  props: ['email'],
  template: `
          <article class="email-preview">
              <h2>{{ email.subject }}</h2>
  
              <div className="actions">
                  <!-- <RouterLink :to="'/email/' + email.id">Details</RouterLink>  -->
                  <!-- <RouterLink :to="'/email/edit/' + email.id">Edit</RouterLink> -->
              </div>
            </article>
      `,

  computed: {},
}

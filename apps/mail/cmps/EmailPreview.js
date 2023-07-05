import { emailService } from '../services/email.service.js'

export default {
  name: 'EmailPreview',
  props: ['email'],
  template: `
             <RouterLink :to="'/mail/' + email.id">
                <article :class="{'email-preview': true,
                                 'unread-email': !email.isRead,
                                 'read-email': email.isRead}">
                    <h2 class="from-preview">{{ email.from }} </h2>
                    <h2 class="content-preview"> 
                       <span class="subject-preview">{{ email.subject }}</span>
                       <span class="body-preview">{{ email.body }}</span>
                    </h2>
                     <h2 class="date-preview">{{ email.sentAt }}</h2>
                    <div class="actions">
                    <!-- <RouterLink :to="'/mail/edit/' + email.id">Edit</RouterLink> -->
                    </div>
                  </article>   
              </RouterLink> 
                   `,

  data() {
    return {
      // emailToEdit: emailService.save(),
    }
  },

  methods: {},
}

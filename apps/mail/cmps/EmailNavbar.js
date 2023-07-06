import { emailService } from '../services/email.service.js'

export default {
  name: 'Email Navbar',
  template: `
             <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
             <div class="navbar">
               <ul class="folder-list">
                 <li class="folder-item" 
                      v-for="folder in folders" 
                      :key="folder.id" 
                      @click="selectFolder(folder)"
                      >
                   <div class="folder-container">
                     <span class="material-icons-outlined">{{ folder.icon }}</span>
                     <span class="folder-name">{{ folder.name }}</span>
                     <span class="email-in-folder-count">{{ folder.emailCount }}</span>
                   </div>
                 </li>
               </ul>
             </div>
             `,
  data() {
    return {
      folders: [
        { id: 1, name: 'Inbox', icon: 'mail', route: '/inbox', emailCount: 0 },
        { id: 2, name: 'Sent', icon: 'send', route: '/sent', emailCount: 0 },
        { id: 3, name: 'Starred', icon: 'star', emailCount: 0 },
        { id: 4, name: 'Trash', icon: 'delete', route: '/trash', emailCount: 0 },
        { id: 5, name: 'Draft', icon: 'drafts', emailCount: 0 },
      ],
    }
  },

  created() {
    this.folders
    // console.log('this.folders', this.folders)
    this.filterEmails()
  },
  methods: {
    selectFolder(folder) {
      // Handle folder selection logic
      console.log('Selected folder:', folder.name)
      this.$emit('selectFolder', folder.name)
      // this.$router.push(`${folder.route}`)
    },
    filterEmails() {
      console.log('hee')
      emailService.query().then((emails) => {
        console.log('emails', emails)

        // Assign email count based on filtered unread emails
        this.folders.forEach((folder) => {
          if (folder.name.toLowerCase() === 'inbox') {
            const unreadEmails = emails.filter((email) => email.folder === 'inbox' && !email.isRead)
            folder.emailCount = unreadEmails.length
          } else {
            folder.emailCount = emails.filter((email) => email.folder === folder.name.toLowerCase()).length
          }
        })
      })
    },
  },
  computed: {},

  components: {
    emailService,
  },
}

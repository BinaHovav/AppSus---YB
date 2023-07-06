import { emailService } from '../services/email.service.js'

export default {
  props: ['emails'],
  name: 'Email Navbar',
  emits: ['selectFolder'],
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
                     <span v-if="folder.name === 'inbox'" 
                           class="email-in-folder-count">
                           {{ unreadEmailCount }}</span>
                   </div>
                 </li>
               </ul>
             </div>
             `,
  data() {
    return {
      folders: [
        { id: 1, name: 'inbox', icon: 'mail', route: '/inbox' },
        { id: 2, name: 'sent', icon: 'send', route: '/sent' },
        { id: 3, name: 'starred', icon: 'star' },
        { id: 4, name: 'trash', icon: 'delete', route: '/trash' },
        { id: 5, name: 'draft', icon: 'drafts' },
      ],
      // unreadEmailCount: 9,
      // emails: [],
    }
  },

  created() {
    // console.log('emails22', this.emails)
  },

  methods: {
    selectFolder(folder) {
      console.log('folder.name', folder.name)
      this.$emit('selectFolder', folder.name)
      // this.$router.push(`${folder.route}`)
    },
  },

  computed: {
    unreadEmailCount() {
      return 5
      // return this.emails.filter((email) => email.folder === 'inbox' && !email.isRead).length
    },
  },
  components: {
    emailService,
  },
}

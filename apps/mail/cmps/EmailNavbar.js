import { emailService } from '../services/email.service.js'

export default {
  props: ['unreadMailsCount'],
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
                      :class="{ 'selected': folder === selectedFolder }"
                  >
                   <div class="folder-container">
                     <span class="material-icons-outlined">{{ folder.icon }}</span>
                     <span class="folder-name">{{ folder.name }}</span>
                     <span v-if="folder.name === 'inbox'" 
                           class="email-in-folder-count">
                           {{ unreadMailsCount }}</span>
                   </div>
                 </li>
               </ul>
             </div>
             `,
  data() {
    return {
      selectedFolder: null,
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
      this.selectedFolder = folder
      console.log('folder.name', folder.name)
      this.$emit('selectFolder', folder.name)
      const router = '/mail/' + folder.name
      this.$router.push(router)
    },
  },

  computed: {},
  components: {
    emailService,
  },
}

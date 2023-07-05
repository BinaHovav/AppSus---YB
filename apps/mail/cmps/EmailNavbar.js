export default {
  name: 'Email Navbar',
  template: `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">

             <div class="navbar">
               <ul class="folder-list">
                 <li class="folder-item" v-for="folder in folders" :key="folder.id" @click="selectFolder(folder)">
                   <div class="folder-container">
                     <span class="material-icons-outlined">{{ folder.icon }}</span>
                     <span class="folder-name">{{ folder.name }}</span>
                   </div>
                 </li>
               </ul>
             </div>
            `,
  data() {
    return {
      folders: [
        { id: 1, name: 'Inbox', icon: 'mail' },
        { id: 2, name: 'Sent', icon: 'send' },
        { id: 3, name: 'Starred', icon: 'star' },
        { id: 4, name: 'Trash', icon: 'delete' },
        { id: 5, name: 'Draft', icon: 'drafts' },
      ],
    }
  },
  methods: {
    selectFolder(folder) {
      // Handle folder selection logic
      console.log('Selected folder:', folder.name)
    },
  },
}

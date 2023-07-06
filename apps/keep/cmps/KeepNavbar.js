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
        { id: 1, name: 'Notes', icon: "lightbulb" },
        { id: 2, name: 'Reminder', icon: 'notifications' },
        { id: 3, name: 'Edit lables', icon: 'edit' },
        { id: 4, name: 'Archive', icon: 'archive' },
        { id: 5, name: 'Bin', icon: 'delete' },
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

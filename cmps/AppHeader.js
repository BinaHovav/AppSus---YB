export default {
  template: `
        <header class="app-header">
            <h1>AppSus

            </h1>
            <nav>
                <RouterLink to="/">Home<span class="material-icons">home</span></RouterLink> | 
                <RouterLink to="/mail/inbox">Mail<span class="material-icons">email</span></RouterLink> |
                <RouterLink to="/keep">Keep<span class="material-icons">note_alt</span></RouterLink> |
                <RouterLink to="/about">About<span class="material-icons">help_outline</span></RouterLink> 
            </nav>
        </header>
    `,
}

export default {
  template: `
        <header class="app-header">
            <a> <routerLink to="/"> <img src="./assets/img/logo.png" /></routerLink></a>

            <nav>
                <RouterLink to="/"><span class="material-icons">home</span></RouterLink> 
                <RouterLink to="/mail/inbox"><span class="material-icons">email</span></RouterLink> 
                <RouterLink to="/keep"><span class="material-icons">note_alt</span></RouterLink> 
                <RouterLink to="/about"><span class="material-icons">help_outline</span></RouterLink> 
            </nav>
        </header>
    `,
}

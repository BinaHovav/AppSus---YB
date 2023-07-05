export default {
    name: 'KeepPreview',
    props: ['keep'],
    template: `
        <article class="book-preview">
           <pre>{{keep}}</pre>
 
        </article>
    `,
    computed:{
    }
}

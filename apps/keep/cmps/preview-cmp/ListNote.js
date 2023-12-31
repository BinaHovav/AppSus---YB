export default {
    props: ['info'],
    template: `
        <!-- <section class="note-add-list"> -->
        <section>    
            <h3>{{info.title}}</h3>
            <ul class="clean-list">
                <li v-for="todo in info.todos" :key="todo.id">
                    <h4 class="todo">+ {{todo.txt}}</h4> 
                </li> 
            </ul>      
        </section>
    `,
    data() {
        return {
            
        }
    },
    created(){
        
    },
    methods: {
        // reportVal() {
        //     this.$emit('set-val', this.val)
        // },
    },
}


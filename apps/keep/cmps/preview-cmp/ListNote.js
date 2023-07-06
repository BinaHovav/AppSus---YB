export default {
    props: ['info'],
    template: `
        <section>
            <label>
                <h1>{{info.title}}</h1>
                <li v-for="todo in info.todos" :key="todo.id">
                    <h4> {{todo.txt}}</h4> 
                </li> 
            </label>  
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


export default {
    props: ['info'],
    template: `
        <section>
            <label>
                <h1>{{info.title}}</h1>
                <li v-for="todo in note.info.todos" :key="todo.id">
                    <input v-model="note.info.todos.txt" type="text" placeholder="Enter todo"/> 
                </li> 
            </label>  
        </section>
    `,
    data() {
        return {
            
        }
    },

    methods: {
        // reportVal() {
        //     this.$emit('set-val', this.val)
        // },
    },
}


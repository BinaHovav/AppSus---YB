export default {
    name: 'AddListNote',
    template: `
        <section class="note-add-list" @keyup.enter="addNote">
            <input v-model="note.info.title" type="text" placeholder="Title"/>
            <ul>
                <li v-for="todo in note.info.todos" :key="todo.id">
                    <input v-model="note.info.todos.txt" type="text" placeholder="Enter todo"/> 
                </li>   
            </ul>
            
        </section>
    `,
    data() {
        return {
            note: {
                type: 'ListNote',
                info: {
                    title: '',
                    todos:[{
                        id: 1,
                        txt: 'Enter todo'
                        }],
                }
            }
        }
    },
    methods: {
       addNote(){
            const note = JSON.parse(JSON.stringify(this.note))
           this.$emit('addNote', note)
       }
    },
}

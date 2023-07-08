import { utilService } from "../../../../services/util.service.js" 
export default {
    name: 'AddListNote',
    template: `
        <!-- <section class="note-add-txt"> -->
        <section class="input_sec">    
            <input v-model="note.info.title" type="text" placeholder="Title"/>
            <ul class="clean-list">
                <li v-for="todo in note.info.todos">                   
                    +  <input v-model="todo.txt" type="text" 
                    placeholder="List Item" @input="addRow()" class="li-input"/> 
                </li>   
            </ul>
            <span @click="addNote" class="btn-close">Close</span>
            <!-- <pre>{{note}}</pre> -->
        </section>
    `,
    data() {
        return {
            note: {
                type: 'ListNote',
                info: {
                    title: '',
                    todos:[{
                        id: utilService.makeId(),
                        txt: ''
                        }],
                }
            }
        }
    },
    methods: {
       addNote(){
           
            let len = this.todos.length
            if(this.todos[len-1].txt === '') this.todos.pop()
            this.$emit('addNote', this.note)
       },
       addRow(){
            let len = this.todos.length
            if(this.todos[len-1].txt === '') return
            let todo = {
                    id:utilService.makeId(),
                    txt:''}
            this.todos.push(todo)
       }
    },
    computed:{
        todos(){return this.note.info.todos}
        
    },
    components: {
        utilService
      },
}

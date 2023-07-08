// import { keepService } from "../../services/keep.service"

export default {
    name: 'AddTextNote',
    template: `
        <!-- <section class="note-add-txt" @keyup.enter="addNote"> -->
        <!-- <section class="note-add-txt"> -->
        <section class="input_sec">    
            <input v-model="note.info.title" type="text" placeholder="Title"/>
            <input v-model="note.info.txt" type="text" placeholder="Take a note..."/>  
            <span @click="addNote" class="btn-close">Close</span>
        </section>
    `,
    data() {
        return {
            // note: keepService.getEmptyNewKeep()
            note:{
                type: 'TextNote',
                info: {
                    title: '',
                    txt: '',
                }
            }
        }
    },
    created(){
        // note.type = 'TextNote'
    },
    methods: {
       addNote(){
            const note = JSON.parse(JSON.stringify(this.note))
           this.$emit('addNote', note)
       }
    },
}

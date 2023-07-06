export default {
    name: 'AddTextNote',
    template: `
        <section class="note-add-txt" @keyup.enter="addNote">
            <input v-model="note.info.title" type="text" placeholder="Title"/>
            <input v-model="note.info.txt" type="text" placeholder="Take a note..."/>  
        </section>
    `,
    data() {
        return {
            note: {
                type: 'TextNote',
                info: {
                    title: '',
                    txt: '',
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

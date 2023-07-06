export default {
    name: 'AddImgNote',
    template: `
        <section class="note-add-img" @keyup.enter="addNote">
            <input v-model="note.info.title" type="text" placeholder="Title"/>
            <input v-model="note.info.url" type="text" placeholder="Enter url of img."/> 
            <img :src="note.info.url" >
        </section>
    `,
    data() {
        return {
            note: {
                type: 'ImgNote',
                info: {
                    title: '',
                    url: 'img/1.jpg',
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

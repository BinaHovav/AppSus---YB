export default {
    name: 'AddImgNote',
    template: `
        <!-- <section class="note-add-txt"> -->
            <img :src="note.info.url" class="note-img" >
            <section class="input_sec">
                <input v-model="note.info.title" type="text" placeholder="Title"/>
                <input v-model="note.info.url" type="text" placeholder="Enter url of img."/> 
            </section>
        <!-- </section> -->
        <span @click="addNote" class="btn-close">Close</span>
    `,
    data() {
        return {
            note: {
                type: 'ImgNote',
                info: {
                    title: '',
                    url: null,
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

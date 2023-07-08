export default {
    props: ["info"],
    name: "EditImgNote",
    template: `
        <section  @keyup.enter="addNote" >
            <img :src="info.url" class="note-img">
            <section class="input_sec">
                <input v-model="infoToEdit.title" type="text" placeholder="Title" @input="updateInfo"/>
                <input v-model="infoToEdit.url" type="text" placeholder="Enter url of img." @input="updateInfo"/> 
            </section>
        </section>
    `,
    data() {
        return {
            infoToEdit: JSON.parse(JSON.stringify(this.info)),
          };
    },
    methods: {
        updateInfo() {
            const info = JSON.parse(JSON.stringify (this.infoToEdit))
            console.log('info',info)
            
            this.$emit("updateNote", info);
          },
    },
}

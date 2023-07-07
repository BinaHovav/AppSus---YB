export default {
  props: ["info"],
  name: "EditTextNote",
  template: `
        <section class="note-add-txt">
            <input v-model="infoToEdit.title" type="text" placeholder="Title" @input="updateInfo"/>
            <input v-model="infoToEdit.txt" type="text" placeholder="Take a note..." @input="updateInfo"/>  
                  
          </section>
    `,
  data() {
    return {
      infoToEdit: JSON.parse(JSON.stringify(this.info)),
    };
  },
  methods: {
    updateInfo() {
      const info = JSON.parse(JSON.stringify(this.infoToEdit));
      // console.log('this.infoToEdit',this.infoToEdit)
      this.$emit("updateNote", info);
    },
  },
};

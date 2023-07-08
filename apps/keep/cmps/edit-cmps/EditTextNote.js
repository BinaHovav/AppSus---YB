export default {
  props: ["info"],
  name: "EditTextNote",
  template: `
        <section class="input_sec">
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
      const info = JSON.parse(JSON.stringify (this.infoToEdit))
      console.log('info',info)
      
      this.$emit("updateNote", info);
    },
  },
};

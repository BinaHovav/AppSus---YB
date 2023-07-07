import { keepService } from "../services/keep.service.js";
/* import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js' */

import TextNote from "./preview-cmp/TextNote.js";
import EditTextNote from "./edit-cmps/EditTextNote.js";

export default {
  name: "KeepEdit",
  props: ["keep"],
  template: `
            
            <section  class="keep-edit" :style="keepToEdit.style">             
                <!-- <Component :is="keep.type" /> -->
                <h1>AAAAAAAAAAAAAAAAAAAAAAAA</h1>
                <Component :is="'Edit' + keep.type" :info="keepToEdit.info" @updateNote="updateNote"/>
                <button @click=save>Close</button>
            </section>
             
       
    `,
  data() {
    return {
      keepToEdit: null,
    };
  },
  computed: {
    // isValid() {
    //     return this.keepToEdit.info.txt > 0
    // }
  },
  created() {
    console.log(this.keep, 'dadasasdasda');
    this.keepToEdit = JSON.parse(JSON.stringify(this.keep));
    console.log(this.keepToEdit.style);
  },

  methods: {
    updateNote(info) {
      console.log('info',info)
      console.log('this.KeepToEdit',this.KeepToEdit)
      this.KeepToEdit.info = info;
    },
    save() {
      
      // console.log('updateNote',note)
      const KeepToSave = JSON.parse(JSON.stringify(this.keepToEdit));
      console.log('KeepToSave',KeepToSave)
      this.$emit("save", KeepToSave);
    },
  },
  computed: {},
  components: {
    EditTextNote
  },
};

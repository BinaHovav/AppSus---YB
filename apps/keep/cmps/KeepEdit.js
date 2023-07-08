import { keepService } from "../services/keep.service.js";
/* import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js' */

// import TextNote from "./preview-cmp/TextNote.js";
import EditTextNote from "./edit-cmps/EditTextNote.js";
import EditListNote from "./edit-cmps/EditListNote.js";
import EditImgNote from "./edit-cmps/EditImgNote.js";

export default {
  name: "KeepEdit",
  props: ["keep"],
  template: `
            
      <section  class="keep-edit" :style="keepToEdit.style">             

          <Component :is="'Edit' + keep.type" :info="keepToEdit.info" @updateNote="updateNote"/>
          
          <span v-if="keep.isPinned"  
                class="material-icons pin" 
                @click="togglePin()">push_pin</span> 

          <span v-if="!keep.isPinned" 
                class="material-icons-outlined pin" 
                @click="togglePin()">push_pin</span>  

          <!-- <span class="material-icons-outlined edit-pin" @click="togglePin()">push_pin</span>    -->
          <span @click=save class="btn-close">Close</span> 
          
          <section class="edit-actions">      
            <label for="create-color">
              <i><span class="material-icons-outlined edit-pallete">palette</span></i>
              <input type="color" v-model="keepToEdit.style.background" id="create-color" style="display: none">
            </label>
            <span class="material-icons-outlined edit-remove" @click="onRemoveKeep(keep.id)">delete</span>   
          </section>  
                
                <!-- <button @click="togglePin()"> -->
                <!-- </button> -->
                <!-- <button>
                  <span class="material-icons-outlined">palette</span>   
                </button> -->

                <!-- <button @click="onRemoveKeep(keep.id)" class="btn-remove" > -->
                <!-- </button> -->


                <!-- <input type="color" v-model="keepToEdit.style.background"> -->
                <!-- <button @click=save>Close</button> -->
              
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
    // console.log(this.keep, 'dadasasdasda');
    // this.keepToEdit = JSON.parse(JSON.stringify(this.keep));
    this.keepToEdit = this.keep
    // console.log(this.keepToEdit.style);
  },

  methods: {
    onRemoveKeep(keepId) {
      // console.log('onRemoveKeep')
      this.$emit('remove', keepId)
    },
    updateNote(info) {
      // console.log('info',info)
      // console.log('this.keepToEdit',this.keepToEdit)
      this.keepToEdit.info = info;
      // console.log('this.keepToEdit',this.keepToEdit)
    },
    togglePin(){
      // console.log('keepToEdit.isPinned',this.keepToEdit.isPinned)
      this.keepToEdit.isPinned = !this.keepToEdit.isPinned
      // console.log('keepToEdit.isPinned',keepToEdit.isPinned)
    },
    save() {
      // console.log('updateNote',note)
      const KeepToSave = JSON.parse(JSON.stringify(this.keepToEdit));
      // console.log('KeepToSave',KeepToSave)
      this.$emit("save", KeepToSave);
    },
  },
  computed: {},
  components: {
    EditTextNote,
    EditListNote,
    EditImgNote
    
  },
};

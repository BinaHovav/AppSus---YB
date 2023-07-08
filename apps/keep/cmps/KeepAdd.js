import { keepService } from "../services/keep.service.js"
/* import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js' */

import AddTextNote from "./add-cmps/AddTextNote.js"
import AddImgNote from "./add-cmps/AddImgNote.js"
import AddListNote from "./add-cmps/AddListNote.js"

export default {
    name: 'KeepAdd',
    props: ['keep'],
    template: `
            <section  class="keep-add">
                <section v-if="type">
                    <Component  :is="type" @addNote="save" />
                   
                </section>
                <section v-if = "!type">
                    <span  @click="chgType('AddTextNote')">Take a note</span> 
                    <section class="add-actions" >
                        <span  @click="chgType('AddListNote')" class="material-icons-outlined">check_box</span>   
                        <span @click="chgType('AddImgNote')" class="material-icons-outlined">image</span>   
                    </section>
                </section> 
                <!-- <span class="material-icons-outlined" @click="chgType('AddTextNote')">text_fields</span>    -->
                <!-- <button @click="chgType('AddTextNote')" > -->
                <!-- </button> -->

                <!-- <button @click="chgType('AddListNote')" >
                </button>

                <button @click="chgType('AddImgNote')" >
                </button> -->

                <!-- <button @click="chgType('AddTextNote')" class="act_btn"><img src="../../assets/icons/text.svg" /></button>            
                <button @click="chgType('AddListNote')" class="act_btn"><img src="../../assets/icons/check_box.svg" /></button>
                <button @click="chgType('AddImgNote')" class="act_btn"><img src="../../assets/icons/image.svg" /></button> -->
                <!-- <button @click="chgType('canvas')"class="act_btn"><img  src="../../assets/icons/edit.svg"/></button> -->
</section>
             
       
    `,
    data() {
        return {
            // type: 'AddTextNote',
            type:'',
            newKeep: keepService.getEmptyNewKeep() 
        }
    },
    computed: {
        // isValid() {
        //     return this.keepToEdit.info.txt > 0
        // }
    },
    created() { 
        // this.newKeep= keepService.getEmptyNewKeep()     
    },

    methods: {
        resetKeep(){
            this.newKeep= keepService.getEmptyKeep()
        },
        save(note) {
            this.newKeep.info = note.info
            this.newKeep.type = note.type
            // console.log('newKeep',this.newKeep)
            this.$emit('save', this.newKeep)
            this.type = ''
        },

        // update() {
        //     console.log('newKeep',this.newKeep)
        //     this.$emit('save', this.newKeep)
        // },
        chgType(newType){
            // console.log('newType',newType)
            this.type = newType
        }
    },
    computed:{
    },
    components: {
        
        AddTextNote,
        AddImgNote, 
        AddListNote
      },
}
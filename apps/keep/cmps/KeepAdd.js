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
                <Component :is="type" @addNote="save"/>
                <!-- <h4>{{formateDate}}</h4> -->
                
                <!-- <button @click="save" class="act_btn">Add</button> --> 
                
                <button @click="chgType('AddTextNote')" class="act_btn"><img src="../../assets/icons/text.svg" /></button>            
                <button @click="chgType('AddListNote')" class="act_btn"><img src="../../assets/icons/check_box.svg" /></button>
                <button @click="chgType('AddImgNote')" class="act_btn"><img src="../../assets/icons/image.svg" /></button>
                <!-- <button @click="chgType('canvas')"class="act_btn"><img  src="../../assets/icons/edit.svg"/></button> -->
</section>
             
       
    `,
    data() {
        return {
            type: 'AddTextNote',
            keepToEdit: keepService.getEmptyKeep(),
        }
    },
    computed: {
        // isValid() {
        //     return this.keepToEdit.info.txt > 0
        // }
    },
    created() {
    
        this.keepToEdit= keepService.getEmptyKeep()     
    },

    methods: {
        resetKeep(){
            this.keepToEdit= keepService.getEmptyKeep()
        },
        save(note) {
            console.log('keepToEdit',note)
            this.$emit('save', note)
        },
        update() {
            console.log('keepToEdit',this.keepToEdit)
            this.$emit('save', this.keepToEdit)
        },
        chgType(newType){
            console.log('newType',newType)
            this.type = newType
        }
    },
    computed:{
        formateDate(){
            return this.keepToEdit.info.createdAt
        }
    },
    components: {
        
        AddTextNote,
        AddImgNote, 
        AddListNote
      },
}
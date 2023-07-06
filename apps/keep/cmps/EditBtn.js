import { keepService } from "../services/keep.service.js"
/* import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js' */

export default {
    name: 'EditBtn',
    
    template: `    
        <button class="act_btn"><img  src="../../assets/icons/add_alert.svg"></button>
        <button class="act_btn"><img  src="../../assets/icons/person_add.svg"></button>
        <button class="act_btn"><img  src="../../assets/icons/palette.svg"></button>
        <button class="act_btn"><img  src="../../assets/icons/image.svg"></button>
        <button class="act_btn"><img  src="../../assets/icons/archive.svg"></button>
        <button class="act_btn"><img  src="../../assets/icons/more_vert.svg"></button>
        <button class="act_btn"><img  src="../../assets/icons/undo.svg"></button>
        <button class="act_btn"><img  src="../../assets/icons/redo.svg"></button>
        <button class="act_btn"><img  src="../../assets/icons/push_pin.svg"></button>
        <button class="act_btn">Close</button>
    `,
    data() {
    
    },
    computed: {
    
    },
    created() {
         
    },

    methods: {
      
    }
}
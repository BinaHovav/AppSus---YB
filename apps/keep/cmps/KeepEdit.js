import { keepService } from "../services/keep.service.js"
/* import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js' */

export default {
    name: 'KeepEdit',
    props: ['keep'],
    template: `
            <form @submit.prevent="save" class="keep-edit">
                <h2>Add a keep</h2>
                <input v-model="keepToEdit.info.title" type="text" placeholder="Title">
                <input v-model="keepToEdit.info.txt" type="text" placeholder="Take a note...">
                <h4>{{formateDate}}</h4>
                <!-- <button :disabled="!isValid">save</button> -->
                <!-- <input id="color" type="color" <img  src="../../assets/icons/palette.svg"/> -->
                <!-- <input id="color"<img  src="../../assets/icons/palette.svg"></button> -->
                <!-- <button class="icon-btn" data-title="remove line" onclick="onDeleteLine(event)"><img class="icon-img" src="icons/delete.png"></button> -->
  
                <button>save</button>
             </form>
       
    `,
    data() {
        return {
            keepToEdit: keepService.getEmptyKeep(),
        }
    },
    computed: {
        // isValid() {
        //     return this.keepToEdit.info.txt > 0
        // }
    },
    created() {
        // const { keepId } = this.$route.params
        // if (!keepId) return
        // keepService.get(keepId)
        //     .then(keep => {
        //         this.keepToEdit = keep
        //     })
        //     .catch(err => {
        //         console.log('Cannot load keep for edit')
        //         // showErrorMsg('Cannot load keep for edit')
        //         // this.$router.push('/keep')
        //     })

        this.keepToEdit= keepService.getEmptyKeep()     
    },

    methods: {
        resetKeep(){
            this.keepToEdit= keepService.getEmptyKeep()
        },
        save() {
            // console.log('keepToEdit', this.keepToEdit)
            // keepService.save(this.keepToEdit)
            //     .then(() => {
            //         console.log('keep saved')
            //         // showSuccessMsg('Keep saved')
            //         // this.$router.push('/keep')
            //     })
            //     .catch(err => {
            //         console.log('cant save Keep', savedKeep)
            //         /* showErrorMsg('Cannot save keep') */
            //     })
            console.log('example',this.keepToEdit)
            this.$emit('save', this.keepToEdit)
        }
    },
    computed:{
        formateDate(){
            return this.keepToEdit.info.createdAt
        }

    }
}
import { keepService } from "../services/keep.service.js"
/* import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js' */

export default {
    template: `
        <!-- <form @submit.prevent="save" class="keep-edit"> -->
            <h2>{{(keepToEdit.id)? 'Edit' : 'Add'}} a keep</h2>
            <input v-model="keepToEdit.info.txt" type="text" placeholder="Enter new keep">
           
            <!-- <RouterLink to="/keep">Cancel</RouterLink>  -->
            <!-- <button :disabled="!isValid" :click="save()">save</button> -->
            <button :click="save()">save</button>
        <!-- </form> -->
    `,
    data() {
        return {
            keepToEdit: keepService.getEmptyKeep(),
        }
    },
    computed: {
        isValid() {
            return this.keepToEdit.info.txt > 0
        }
    },
    created() {
        const { keepId } = this.$route.params
        if (!keepId) return
        keepService.get(keepId)
            .then(keep => {
                this.keepToEdit = keep
            })
            .catch(err => {
                console.log('Cannot load keep for edit')
                // showErrorMsg('Cannot load keep for edit')
                // this.$router.push('/keep')
            })
    },

    methods: {
        save() {
            keepService.save(this.keepToEdit)
                .then(() => {
                    console.log('keep saved')
                    // showSuccessMsg('Keep saved')
                    // this.$router.push('/keep')
                })
                .catch(err => {
                    console.log('cant save Keep', savedKeep)
                    /* showErrorMsg('Cannot save keep') */
                })
        }
    }
}
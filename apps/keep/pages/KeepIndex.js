import { keepService } from '../services/keep.service.js'

import keepList from '../cmps/KeepList.js'

import keepEdit from '../cmps/KeepEdit.js'


export default {

    name: 'keepIndex',
    template: `
        <section class="keep-index">
            <!-- <h1>hellow from index</h1> -->
            <keepEdit  @save="saveKeep"/>
            <keepList v-if="keeps"
            :keeps="keeps" 
            @remove="removeKeep"/> 
            
        </section>
    `,
    data() {
        return {
            keeps: null,
            filterBy: {},
            
        }
    },
    created(){
        keepService.query()
            .then(keeps => this.keeps = keeps)
    },
    methods: {
        removeKeep(keepId) {
            console.log('remove keepId',keepId)
            keepService.remove(keepId)    
                .then(() => {
                    const idx = this.keeps.findIndex(keep => keep.id === keepId)
                    this.keeps.splice(idx, 1)
                    // showSuccessMsg('Keep removed')
                    console.log('Keep removed')
                })
                .catch(err => {
                    // showErrorMsg('Cannot remove keep')
                    console.log('Cannot remove keep')
                })
        },
        saveKeep(keepToEdit) {
            console.log('keepToEdit', keepToEdit)
            keepService.save(keepToEdit)
                .then((res) => {
                    console.log('res',res)
                    console.log('keep saved')
                    this.keeps.push(keepToEdit)
                    // showSuccessMsg('Keep saved')
                    // this.$router.push('/keep')
                })
                .catch(err => {
                    console.log('cant save Keep', savedKeep)
                    /* showErrorMsg('Cannot save keep') */
                })
            }
            
    },
    components: {       
        keepList,
        keepEdit
    }
}

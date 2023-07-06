import { keepService } from '../services/keep.service.js'

import keepList from '../cmps/KeepList.js'

// import keepEdit from '../cmps/KeepAdd.js'
import keepAdd from '../cmps/KeepAdd.js'
import keepNavbar from '../cmps/KeepNavbar.js'
// import TextNote from './preview-cmp/TextNote.js'
// import ImgNote from './preview-cmp/ImgNote.js'
// import ListNote from './preview-cmp/ListNote.js'
export default {

    name: 'keepIndex',
    template: `
        <section class="keep-index" class="main-screen">
            <!-- <h1>hellow from keep index</h1> -->
            <keepNavbar/>
            <!-- <keepEdit  @save="saveKeep"/> -->
            <keepAdd  @save="saveKeep" @update="updateKeep"/>
            <!-- <keepAdd v-if="route==='view'" @chg-route="chgRoute"/> -->
            <keepList v-if="keeps"
            :keeps="keeps" 
            @remove="removeKeep"/> 
            
        </section>
        <div class="modal">
            <div class="modal-content">
                <h2 class="modal-title">
                <!-- Edit Note:
                </h2>
                <p>
                    modal details
                </p> -->
                <!-- <Component :is="type" @addNote="save"/> -->
                <button class="modal-btn" @click="closeModal">Close</button>
            </div>
        </div>
    `,
    data() {
        return {
            keeps: null,
            filterBy: {},
            // route:'view'
            
        }
    },
    created(){
        keepService.query()
            .then(keeps => this.keeps = keeps)
    },
    methods: {
        loadKeeps(){
            keepService.query()
            .then(keeps => {
                // let tempKeeps = keeps
                // let pinKeeps = keeps.filter(keep => keep.isPinned)
                // let nonPinKeeps = keeps.filter(keep => !keep.isPinned)
                this.keeps = keeps
            })

        },
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
        updateKeep(keepToEdit) {
            emailService.save(keepToEdit).then((updatedKeep) => {
              const keepIdx = this.keeps.findIndex((keep) => keep.id === updatedKeep.id)
              this.keeps.splice(keepIdx, 1, updatedKeep)
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
            },
            chgRoute(state) {
                this.route = state
                console.log('change route to ', state)
           
            },
            onToggelModal()  {
                keepService.toggleModal()
            }  
            
    },
    components: {       
        keepList,
        keepAdd, 
        keepNavbar,
        // TextNote,
        // ImgNote,
        // ListNote
    }
}

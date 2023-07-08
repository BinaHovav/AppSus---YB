import { keepService } from '../services/keep.service.js'

import keepList from '../cmps/KeepList.js'
import KeepEdit from '../cmps/KeepEdit.js'

// import keepEdit from '../cmps/KeepAdd.js'
import keepAdd from '../cmps/KeepAdd.js'
import keepNavbar from '../cmps/KeepNavbar.js'
// import TextNote from './preview-cmp/TextNote.js'
// import ImgNote from './preview-cmp/ImgNote.js'
// import ListNote from './preview-cmp/ListNote.js'
export default {

    name: 'keepIndex',
    template: `
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">

        <section class="keep-index" >
            <!-- <h1>hellow from keep index</h1> -->
            <!-- <keepNavbar/> -->
            
            <!-- <keepAdd  @save="saveKeep" @update="updateKeep"/> -->
            <keepAdd  @save="saveKeep"/>
            
            <keepList v-if="pinKeeps"
            :keeps="pinKeeps" 
            @editKeep="onEditKeep"/> 

            <keepList v-if="nonPinkeeps"
            :keeps="nonPinkeeps" 
            @editKeep="onEditKeep"/> 
            
            <KeepEdit v-if="keepToEdit" :keep="keepToEdit" @save="updateKeep" @remove="removeKeep"/>
        </section>
    `,
    data() {
        return {
            pinKeeps:null,
            nonPinkeeps: null,
            // keeps: null,
            filterBy: {},
            keepToEdit: null
            // route:'view'
            
        }
    },
    created(){
        this.loadKeeps()
    },
    methods: {
        loadKeeps(){
            keepService.query()
            .then(keeps => {
                this.nonPinkeeps = keeps.filter(keep => !keep.isPinned)
                this.pinKeeps = keeps.filter(keep => keep.isPinned)
                // this.keeps = [...this.pinKeeps,... this.nonPinkeeps]
                
            })

        },
        onEditKeep(keep){
         console.log(keep);

            this.keepToEdit = keep
        },
        removeKeep(keepId) {
            console.log('remove keepId',keepId)
            keepService.remove(keepId)    
                .then(() => {
                    // const idx = this.keeps.findIndex(keep => keep.id === keepId)
                    // this.keeps.splice(idx, 1)
                    loadKeeps()
                    // showSuccessMsg('Keep removed')
                    console.log('Keep removed')
                })
                .catch(err => {
                    // showErrorMsg('Cannot remove keep')
                    console.log('Cannot remove keep')
                })
        },
        updateKeep(keepToEdit) {
            console.log('keepToEdit', keepToEdit)
            
            keepService.save(keepToEdit).then((updatedKeep) => {
            //   const keepIdx = this.keeps.findIndex((keep) => keep.id === updatedKeep.id)
            //   this.keeps.splice(keepIdx, 1, updatedKeep)
            this.loadKeeps()
              this.keepToEdit= null
            })
          },

        saveKeep(keep) {
            console.log('keep', keep)
            keepService.save(keep)
                .then((res) => {
                    this.loadKeeps()
                    // console.log('res',res)
                    // console.log('keep saved')
                    // this.keeps.push(keepToEdit)
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
        KeepEdit
        // TextNote,
        // ImgNote,
        // ListNote
    }
}

import TextNote from './preview-cmp/TextNote.js'
import ImgNote from './preview-cmp/ImgNote.js'
import ListNote from './preview-cmp/ListNote.js'

export default {
  name: 'KeepPreview',
  props: ['keep'],
  template: `
        <article class="keep-preview" :style="keep.style" @click="editKeep">
           <!-- <pre>{{keep}}</pre>         -->
           <Component 
                :is="keep.type"  
                :info="keep.info" 
                @set-val="setAns($event, idx)" 
                /> 
            <section class="actions">    
                <span class="material-icons-outlined pin">push_pin</span>   
                <span class="material-icons-outlined">palette</span> 
                <span class="material-icons-outlined">delete</span>    
                <span class="btn-close">Close</span>
                
            </section>    

        </article>
    `,
  data() {
    return {
      answer: null,
    }
  },
  methods: {
    setAns(ans, idx) {
      console.log('Setting the answer: ', ans, 'idx:', idx)
      this.answer = ans
    },
    save() {
      console.log('Saving..')
    },
    editKeep() {
      this.$emit('editKeep', this.keep)
    },
  },
  computed: {},
  components: {
    TextNote,
    ImgNote,
    ListNote,
  },
}

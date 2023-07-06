import TextBox from './preview-cmp/TextNote.js'
import ImgBox from '../cmps/ImgBox.js'

export default {
    name: 'KeepPreview',
    props: ['keep'],
    template: `
        <article class="keep-preview" :style="keep.style">
           <!-- <pre>{{keep}}</pre> -->        
           <Component 
                :is="keep.type"  
                :info="keep.info" 
                @set-val="setAns($event, idx)" /> 
        </article>
    `,
        data() {
            return {
                answer: null
            }
        },
        methods: {
            setAns(ans, idx) {
                console.log('Setting the answer: ', ans, 'idx:', idx);
                this.answer= ans
    
            },
            save() {
                console.log('Saving..');
            }
        },
    computed:{
    },
    components: {
     
        TextBox,
        ImgBox
     
    }
}

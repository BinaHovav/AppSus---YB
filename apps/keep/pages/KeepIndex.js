import { keepService } from '../services/keep.service.js'

import keepList from '../cmps/KeepList.js'


export default {

    name: 'keepIndex',
    template: `
        <section class="keep-index">
            <h1>hellow from index</h1>
            <keepList v-if="keeps"
            :keeps="keeps" /> 
            
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
    components: {       
        keepList,
    }
}

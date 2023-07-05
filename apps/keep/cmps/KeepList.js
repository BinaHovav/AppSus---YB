import KeepPreview from './KeepPreview.js'

export default {
    name: 'KeepList',
    props: ['keeps'],
    template: `
        <section class="keep-list">
            <ul>
                <li v-for="keep in keeps" :key="keep.id">
                    <KeepPreview :keep="keep"/>
        
                </li>
            </ul>
        </section>
    `,
    methods: {
     
    },
    components: {       
        KeepPreview,
    }
}
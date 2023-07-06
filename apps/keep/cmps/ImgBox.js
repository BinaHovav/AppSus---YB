export default {
    props: ['info'],
    template: `
        <section>
            <!-- <datalist :id="datalistId">
                <option v-for="opt in info.opts" :value="opt" :key="opt" />
            </datalist> -->
            <label>
                <h1>{{info.title}}</h1>
                <img class="img-card" src={{info.img}}>
        
    
            </label>  
        </section>
    `,
    data() {
        return {
            
        }
    },

    methods: {
       
    },
}


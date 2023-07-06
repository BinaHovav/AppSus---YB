export default {
    props: ['info'],
    template: `
        <section>
            <!-- <datalist :id="datalistId">
                <option v-for="opt in info.opts" :value="opt" :key="opt" />
            </datalist> -->
            <label>
                <h1>{{info.title}}</h1>
                <h2>{{info.txt}}</h2>
            </label>  
        </section>
    `,
    data() {
        return {
            // txt: info.txt,
        }
    },

    methods: {
        // reportVal() {
        //     this.$emit('set-val', this.val)
        // },
    },
}


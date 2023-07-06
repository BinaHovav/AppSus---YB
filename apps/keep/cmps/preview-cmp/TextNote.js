export default {
    props: ['info'],
    template: `
        <section>
            <h1>{{info.title}}</h1>
            <h2>{{info.txt}}</h2> 
        </section>
    `,
    data() {
        return {
            
        }
    },

    methods: {
        // reportVal() {
        //     this.$emit('set-val', this.val)
        // },
    },
}


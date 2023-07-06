export default {
    props: ['info'],
    template: `
        <section>
            <h1>{{info.title}}</h1>
            <img :src="note.info.url" >
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


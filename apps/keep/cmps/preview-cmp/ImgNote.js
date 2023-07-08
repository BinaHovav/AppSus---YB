export default {
    props: ['info'],
    template: `
        <section >
            <h3>{{info.title}}</h3>
            <img :src="info.url" />
        </section>
    `,
    data() {
        return {
            
        }
    },
    created(){
        console.log();
    },
    methods: {
        // reportVal() {
        //     this.$emit('set-val', this.val)
        // },
    },
}


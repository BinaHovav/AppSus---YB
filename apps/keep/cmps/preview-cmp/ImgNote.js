export default {
    props: ['info'],
    template: `
        <section class="note-add-img">
            <h1>{{info.title}}</h1>
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


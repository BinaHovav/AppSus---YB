export default {
    props: ['info'],
    template: `
        <section class="preview">
            <h3>{{info.title}}</h3>
            <h4>{{info.txt}}</h4> 
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


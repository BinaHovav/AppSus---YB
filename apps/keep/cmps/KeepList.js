import KeepPreview from './KeepPreview.js'

export default {
  name: 'KeepList',
  props: ['keeps'],
  template: `
        <section class="keep-list">
            <ul class="clean-list">
                <li v-for="keep in keeps" :key="keep.id">
                    <KeepPreview :keep="keep"/>  <!-- <section class="actions"> -->
                        <!-- <button class="btn-remove" @click="onRemoveKeep(keep.id)">x</button> -->
                       <button class="btn-remove"  @click="onRemoveKeep(keep.id)"><img  src="../../assets/icons/delete.svg"></button>
                    <section class="actions">
                        <!-- <button class="remove-button" @click="onRemoveKeep(keep.id)">x</button> -->
                        <!-- <button @click="onEditKeep(keep.id)">edit</button> -->
                    </section>
                </li>
            </ul>
        </section>
    `,
  methods: {
    onRemoveKeep(keepId) {
      this.$emit('remove', keepId)
    },
    onEditKeep(keepId) {},
  },
  components: {
    KeepPreview,
  },
}

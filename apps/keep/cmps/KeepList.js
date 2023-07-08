import { keepService } from '../services/keep.service.js'
import KeepPreview from './KeepPreview.js'

export default {
  name: 'KeepList',
  props: ['keeps'],
  template: `
        <section class="keep-list">
            <ul class="clean-list">
                <li v-for="keep in keeps" :key="keep.id">
                  <KeepPreview :keep="keep" @editKeep="onEditKeep"/>  <!-- <section class="actions"> -->
                  <!-- <span @click="onRemoveKeep(keep.id)" class="material-icons-outlined" >delete</span>    -->
                      <!-- <button class="btn-remove" @click="onRemoveKeep(keep.id)">x</button> -->
                      <!-- <button class="btn-remove"  @click="onRemoveKeep(keep.id)"><img  src="../../assets/icons/delete.svg"></button> -->
                      <!-- <button  class="btn-remove" @click="onRemoveKeep(keep.id)">
                      <span  class="material-icons-outlined" >delete</span> 
                      </button> -->
                        <!-- <button class="btn-edit"  @click="onEditKeep(keep.id)"><img  src="../../assets/icons/edit.svg"></button> -->
                        <!-- <section class="actions">
                          
                    </section> -->
                </li>
            </ul>
        </section>
    `,
  methods: {
    onRemoveKeep(keepId) {
      this.$emit('remove', keepId)
    },
    onEditKeep(keep) {

      this.$emit('editKeep', keep)
    },
  },
  components: {
    KeepPreview,
    keepService
  },
}

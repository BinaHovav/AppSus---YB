import { utilService } from "../../../../services/util.service.js";
export default {
  props: ["info"],
  name: "EditListNote",
  template: `
        <!-- <section class="note-add-list">
            <input v-model="infoToEdit.title" type="text" placeholder="Title" @input="updateInfo"/>
            <input v-model="infoToEdit.txt" type="text" placeholder="Take a note..." @input="updateInfo"/>  
                  
          </section> -->

        <section class="input_sec">
          <input v-model="infoToEdit.title" type="text" placeholder="Title" @input="updateInfo"/>
          <ul class="clean-list">
              <li v-for="todo in infoToEdit.todos" class="li-input">
                + <input v-model="todo.txt" type="text" placeholder="List Item" @input="addRow()" @input="updateInfo"/> 
              </li>   
          </ul>
          <!-- <pre>{{infoToEdit}}</pre> -->
        </section>
    `,


  data() {
    return {
      infoToEdit: null,
    };
  },
  created(){
    this.infoToEdit= JSON.parse(JSON.stringify(this.info)),
    console.log('infoToEdit',this.infoToEdit)
    this.addRow()
  },
  methods: {
    updateInfo() {
      console.log('updateInfo')
      let len = this.todos.length
      if(this.todos[len-1].txt === '') this.todos.pop()
      const info = JSON.parse(JSON.stringify (this.infoToEdit))
      console.log('info',info)
      
      this.$emit("updateNote", info);
    },
    addRow(){
      // console.log('addRow')
      let len = this.todos.length
      if(this.todos[len-1].txt === '') return
      let todo = {
              id:utilService.makeId(),
              txt:''}
      this.todos.push(todo)
    },
  },
  computed:{
    todos(){return this.infoToEdit.todos}
    
  },
}


Vue.component('todo-item', {
  template: `
    <li>
      <select v-on:change="$emit('update-list', $event.target.value, id)">
        <option v-for="option in options" v-bind:value="option" :selected="checkIfSelectMatchesTodo(option, id)"> {{ option }} </option></select>
      <button v-on:click="$emit('remove')">X</button>
      {{ title }}
    </li>
  `, 
  props: ['title', 'options', 'id'],
  methods: {
    checkIfSelectMatchesTodo: function(option, id){
      return option === id ? true : false;
    }
  }
});

const todoApp = new Vue({
  el: '#todoApp',
  data: {
    newListSelection: '',
    newTodoText: '',
    todos: [],
    nextTodoId: 1,
    options: []
  },
  methods: {
    addNewTodo: function(uploading){
      if (this.todos.length === 10) {
        return;
      }
      this.options.push(this.nextTodoId);
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      });
      this.newTodoText = '';
      if (!uploading) {
        this.saveList();
      }
    },
    removeTodo: function(index){
      this.options.pop();
      this.nextTodoId--;
      this.todos.splice(index, 1);
      this.todos.forEach((todo, index) => {
        todo.id = index + 1;
      });
      this.saveList();
    }, 
    updateList: function(option, id){
      let item = this.todos[id - 1];
      this.todos.splice(id - 1, 1);
      this.todos.splice(option - 1, 0, item);
      this.todos.forEach((todo, index) => {
        todo.id = index + 1;
      });
      this.saveList();
    },
    saveList: function(){
      localStorage.setItem('vueTodoList', JSON.stringify(this.todos));
    },
    uploadList: function(){
      const vueTodoList = localStorage.getItem('vueTodoList');
      if (vueTodoList) {
        const oldTodos = JSON.parse(vueTodoList);
        oldTodos.forEach(todo => {
          this.newTodoText = todo.title;
          this.addNewTodo(true);
        })
      }
    }
  }
});

todoApp.uploadList();

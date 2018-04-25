
Vue.component('todo-item', {
  template: `\
    <li>\
      {{ title }}\
      <span>Priority:\
      <select>\
        <option v-for="option in options" v-bind:value="option" :selected="checkIfSelectMatchesTodo(option, id)" v-bind:onchange="$emit(\'update-list(value, id)\')"> {{ option }} </option></select></span>\
      <button v-on:click="$emit(\'remove\')">X</button>\
    </li>\
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
    newTodoText: '',
    todos: [
      {
        id: 1,
        title: 'Do the dishes'
      }, {
        id: 2,
        title: 'Take out the trash'
      }, {
        id: 3,
        title: 'Mow the lawn'
      }
    ],
    nextTodoId: 4,
    options: [1, 2, 3]
  },
  methods: {
    addNewTodo: function(){
      this.options.push(this.nextTodoId);
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      });
      this.newTodoText = '';
    },
    removeTodo: function(index){
      this.options.pop();
      this.nextTodoId--;
      this.todos.splice(index, 1);
      this.todos.forEach((todo, index) => {
        todo.id = index + 1;
      })
    }, 
    updateList: function(value, id){
      console.log('hi');
      let item = this.todos[id - 1];
      this.todos.splice(id - 1, 1);
      this.todos.splice(value - 1, 0, item);
    }
  }
});

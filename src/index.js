import './styles.css';

import { Todo, TodoList   } from './classes';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();


// const tarea = new Todo('Aprender Javascript');

// todoList.nuevoToDo(tarea);

// console.log(todoList);

// crearTodoHtml(tarea);


// localStorage.setItem( 'llave', 'valoraAlmacenar');
// localStorage.removeItem('llave', 'valoraAlmacenar');
// sessionStorage.setItem( 'llave', 'valoraAlmacenar');

// setTimeout ( ()=> {

//     localStorage.removeItem('llave');
// }, 1500);

// todoList.todos.forEach(todo => crearTodoHtml(todo)); //PAra poner en el html nuevamente los elementos que quedaron el memoria
todoList.todos.forEach (crearTodoHtml); //Lo mismo de arriba pero mas barato xD

//const newTodo = new Todo('Aprender js');

console.log('todos', todoList.todos);
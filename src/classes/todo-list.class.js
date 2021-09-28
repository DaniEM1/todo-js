import { Todo } from "./todo.class";


export class TodoList{


    constructor (){
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoToDo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarToDo (id){
        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarLocalStorage();    
    }

    marcarCompletado(id){

        for (const todo of this.todos){

            // console.log(id, todo.id);
            if (todo.id == id){

                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break
            }
        }

    }

    elimininarCompletados(){

        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();    }


    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify( this.todos));
    }

    cargarLocalStorage(){

        // if (localStorage.getItem('todo')){
        //     this.todos = JSON.parse(localStorage.getItem('todo'));
        //     console.log('Cargar Local: ', this.todos);
        // } else {
        //     this.todos = [];
        // }

        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];
        //  console.log('todos despues del string',this.todos);
        
        this.todos = this.todos.map(obj => Todo.fromJson(obj));
        // this.todos = this.todos.map( Todo.fromJson ); // lo de arriba pero optimizado, no mever xD
        // console.log('todos despues del map',this.todos);
        // localStorage.removeItem('todo');
    }

}
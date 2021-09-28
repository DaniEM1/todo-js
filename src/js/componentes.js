import { Todo, TodoList } from "../classes";
import { todoList } from "../index";

//Referencias en el html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const contador = document.querySelector('.todo-count');
const marcarAll = document.querySelector('.toggle-all');


export const crearTodoHtml = ( todo ) =>{

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado)  ? 'checked' : '' }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    for ( let j = divTodoList.children.length-1; j>=0; j-- ){ //oculta o aparece boton de eliminar todo
        const elemento2 = divTodoList.children[j];

    if (elemento2.classList.contains('completed')){
        // divTodoList.removeChild(elemento2);
        btnBorrar.classList.remove('hidden');
        break;
    }else {
        btnBorrar.classList.add('hidden');            
    }
    }


    var count = 0;  
        for ( let i = divTodoList.children.length-1; i>=0; i-- ){ //cuenta los elementos con comleted en el DOM
        const elemento3 = divTodoList.children[i]; 
        if (elemento3.classList.contains('completed')){
            count ++;
        }
        }
        contador.innerText =`${count} pendiente(s)`;

    // return div.firstElementChild;
}

//eventos
txtInput.addEventListener ('keyup', (event)=>{
    // console.log(event);
    if (event.keyCode === 13 && txtInput.value.length > 0){
        console.log(txtInput.value);
        const nuevoToDo = new Todo(txtInput.value);
        todoList.nuevoToDo(nuevoToDo);

        // console.log(todoList);

        crearTodoHtml (nuevoToDo);
        txtInput.value = '';
    }

});

divTodoList.addEventListener('click', (event)=>{

    // console.log('click');
    // console.log(event.target.localName);

    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento   = event.target.parentElement.parentElement; // parentElement para seleccionar elementos padre
    const todoID         = todoElemento.getAttribute('data-id');
    const checked        = event.target;

    // console.log(nombreElemento);
    // console.log(todoElemento);
    // console.log(todoID);
    console.log(checked);

    if ( nombreElemento.includes('input')){ //click en el check

        todoList.marcarCompletado(todoID);
        todoElemento.classList.toggle('completed');
        checked.toggleAttribute('checked');


        for ( let j = divTodoList.children.length-1; j>=0; j-- ){//activar boton de marcarAll
            // console.log(divTodoList.children[j]);
            if(!divTodoList.children[j].classList.contains('completed')){
                marcarAll.disabled = false;
            }        
        }
        
        for ( let i = divTodoList.children.length-1; i>=0; i-- ){ //oculta o aparece boton de eliminar todo
            const elemento2 = divTodoList.children[i];

        if (elemento2.classList.contains('completed')){
            // divTodoList.removeChild(elemento2);
            btnBorrar.classList.remove('hidden');
            break;
        }else {
            btnBorrar.classList.add('hidden');            
        }
        }


        var count = 0;  
        for ( let i = divTodoList.children.length-1; i>=0; i-- ){ //cuenta los elementos con completed en el DOM
        const elemento3 = divTodoList.children[i]; 
        if (elemento3.classList.contains('completed')){
            count ++;
        }
        }
        contador.innerText =`${count} pendiente(s)`;
        
        
    }else if (nombreElemento.includes('button')){ //hay que borrar el todo

        todoList.eliminarToDo( todoID);
        divTodoList.removeChild(todoElemento);
    }

    console.log(todoList);
});


btnBorrar.addEventListener('click', () => {

    todoList.elimininarCompletados();
    for ( let i = divTodoList.children.length-1; i>=0; i-- ){
        
        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
    btnBorrar.classList.add('hidden');
    
});

ulFiltros.addEventListener('click', (event)=>{

    const filtro = event.target.text;
    if (!filtro){ return;}

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children){
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro){
            case 'Pendientes':
                    if (completado){
                        elemento.classList.add('hidden');
                    }
                    break;

            case 'Completados':
                if (!completado){
                    elemento.classList.add('hidden');
                }
                break;
        }
    }

});


marcarAll.addEventListener('click', ()=>{

    const view = document.querySelectorAll('.view'); //va aqui adentro porque el html carga despues
    // console.log(marcarAll);
    for ( let i = divTodoList.children.length-1; i>=0; i-- ){
        if(!divTodoList.children[i].classList.contains('completed')){
            console.log(divTodoList.children[i].getAttribute('data-id'));
            todoList.marcarCompletado(divTodoList.children[i].getAttribute('data-id'));
            divTodoList.children[i].classList.toggle('completed');        
        }
        
    }

    // console.log(view);
    for ( let j = view.length-1; j>=0; j-- ){
        // console.log(view[j]);
        // if(!view[j].firstElementChild.hasAttribute('checked')){
        //     view[j].firstElementChild.toggleAttribute('checked');
        // }  
        // console.log(todoList.todos[j].completado);
        if(todoList.todos[j].completado){
            view[j].firstElementChild.setAttribute('checked', '');
            todoList.todos[j].completado = true;
        }
    }  

    var count = 0;
    for ( let i = divTodoList.children.length-1; i>=0; i-- ){ //cuenta los elementos con comleted en el DOM
        const elemento3 = divTodoList.children[i]; 
        if (elemento3.classList.contains('completed')){
            count ++;
        }
        }
        contador.innerText =`${count} pendiente(s)`;
    
    marcarAll.disabled = true;

});


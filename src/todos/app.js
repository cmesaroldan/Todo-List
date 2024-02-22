import html from './app.html?raw';
import todosStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './models/use-cases';
import todoStore from '../store/todo.store';

const ElementIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId) => {

    const displayTodos = () => {
        const todos = todosStore.getTodos( todosStore.getCurrentFilter() );
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCountLabel);
    }
  

    (()=>{

        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector( elementId ).append( app );
        displayTodos();

    })();

    //Refrencias HTML
    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoListUL = document.querySelector( ElementIDs.TodoList );
    const clearCompletedButton = document.querySelector( ElementIDs.ClearCompleted);
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);

    //Listeners
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        if( event.keyCode !== 13) return;
        if( event.target.value.trim().length === 0) return;

        todoStore.addTodo( event.target.value);
        displayTodos();
        event.target.value = '';

    });

    todoListUL.addEventListener('click', (event) =>{
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) =>{
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if( !isDestroyElement || !element) return;

        todoStore.deleteTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', () =>{
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach( element =>{

        element.addEventListener('click', (element)=>{
            filtersLIs.forEach(el =>el.classList.remove('selected'));
            element.target.classList.add('selected');

            console.log(element.target.text);

            switch( element.target.text ){
                case 'Todos':
                    todosStore.setFilter( Filters.All )
                break;
                case 'Pendientes':
                    todosStore.setFilter( Filters.Pending )
                break;
                case 'Completados':
                    todosStore.setFilter( Filters.Completed )
                break;
            }

            displayTodos();
        })

    });

}
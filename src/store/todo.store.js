import { Todo } from '../todos/models/todo.models';

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del universo'),
        new Todo('Piedra del campo'),
        new Todo('Piedra de realidad'),

    ],
    filter: Filters.All,
}

 const initStore = () => {
    loadStore();
}

const loadStore = () => {
   if( !localStorage.getItem('state') )return;
   
   const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state'));
   state.todos = todos;
   StaticRange.filter = filter;

}

const saveToLocalStorage = () =>{
    localStorage.setItem('state', JSON.stringify(state))
}

const getTodos = ( filter = Filters.All) =>{
    switch( filter ){
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter( todo => todo.done === true);
        
        case Filters.Pending:
            return state.todos.filter( todo => todo.done === false);

        default:
            throw new Error(`Option $ {filter} is not valid`);

    }
}

/**
 * 
 * @param {String} descriptio 
 */

const addTodo = ( description ) => {
    
    if( !description ) throw new Error( 'Description is required' );

    state.todos.push( new Todo( description ));

    saveToLocalStorage();
}

const toggleTodo = ( todoId ) => {
    
    state.todos = state.todos.map( todo => {

        if ( todo.id === todoId ){
            todo.done = !todo.done;
        }

        return todo;
    });

    saveToLocalStorage();
}

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    saveToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done );
    saveToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
    saveToLocalStorage();  
}

const getCurrentFilter = () => {
    return state.filter;
}



export default{
    initStore,
    loadStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
    getTodos,

}

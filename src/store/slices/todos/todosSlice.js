import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        done:0,
        isLoading: false,
        lastId:0,
    },
    reducers:{
        startLoadingTodos: (state)=>{
            state.isLoading = true;
        },
        setTodos: (state, action) =>{
            state.isLoading = false;
            state.todos = action.payload.todos;
            state.lastId = state.todos.slice(-1)[0].id;
            state.todos.map( todo => (todo.checked)?state.done+=1:0);
            
        },
        addTodo: (state, action) =>{
            const newTodo = {
                id: state.lastId + 1, 
                label: action.payload.label, 
                checked: false
            };
            state.todos.push(newTodo);
            state.lastId +=1;
        },
        removeTodo: (state, action) =>{
            if(state.todos.length > 1){
                if(state.todos[action.payload].checked) state.done -=1;
                state.todos.splice(action.payload, 1);
            }
            else {
                state.todos = [];
                state.done = 0;
            };
        },
        toggleTodo: (state, action) =>{
            let check = state.todos.find(todo => todo.id === action.payload).checked;
            (check)?state.done -=1:state.done +=1;
            state.todos.find(todo => todo.id === action.payload).checked = !check
        },


    },
})

export const { 
    startLoadingTodos, 
    setTodos, 
    addTodo,
    removeTodo,
    toggleTodo } = todosSlice.actions;

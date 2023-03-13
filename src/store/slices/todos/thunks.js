import { addTodo, removeTodo, setTodos, startLoadingTodos, toggleTodo } from "./todosSlice"
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const getTodos = ()=> {
    return async (dispatch, getState)=>{
        dispatch(startLoadingTodos());

        const resp = await fetch('https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos');
        const data = await resp.json();

        dispatch(setTodos({todos: data}));
    }
};

export const startDeleteTodo = (todoId) =>{
    return async (dispatch, getState)=>{

        const { todos } = getState().todos;

        const index = todos.findIndex(e=>e.id === todoId);
        
        fetch(`https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${todoId}`, {method: 'DELETE'}) //El id que guardara en la BD sera distinto al index en el array.
        .then(async response => {
            const data = await response.json();

            dispatch(removeTodo(index));
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
            toast(`Not Found, ${error}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        });
    }
}

export const startAddingTodo = (todoLabel) =>{
    return async (dispatch, getState)=>{

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ label: todoLabel })
        };
        await fetch('https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            dispatch(addTodo(todoLabel));
            //Este metodo si funcionara bien la API nos daria el ID con el que se agregara la tarea.
        })
        .catch(error => {
            toast(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        });
    }
}

export const startCheckingTodo = (todoId) =>{
    return async (dispatch, getState)=>{

        const { todos } = getState().todos;

        const index = todos.findIndex(e=>e.id === todoId);

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ checked: !todos[index].checked })
        };
        await fetch(`https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${index}`, requestOptions)
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
        
            dispatch(toggleTodo(index));
        })
        .catch(error => {
            console.error('There was an error!', error);
            toast(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        });

    }
}

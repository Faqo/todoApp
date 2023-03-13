import { useEffect } from "react";
import "./styles.css";
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, getTodos, startCheckingTodo, startDeleteTodo } from "store/slices/todos";
import TodoListItem from "components/TodoListItem";

const TodoList = () => {

  const dispatch = useDispatch();
  const { isLoading, todos=[] } = useSelector( state => state.todos );
  
  useEffect(() => {
    dispatch( getTodos() )
  
  }, [addTodo])
  

  const handleDelete = (todoId) => {
    // Fix an ability to delete task
    dispatch(startDeleteTodo(todoId))
  };

  const toggleCheck = (todoId) => {
    // Fix an ability to toggle task
    dispatch(startCheckingTodo(todoId))
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      <div className="todo-list-content">
        { todos.map(todo =>(
          <TodoListItem 
            key={todo.id}
            label={todo.label}
            checked={todo.checked}
            onCheck={() => toggleCheck(todo.id)}
            onDelete={() => handleDelete(todo.id)}
          />
        )) }
      </div>
      {
        (isLoading)?<div className="no-todos">Loading...</div>:''
      }
      {
        (!isLoading)&&(todos.length === 0)  
        ?(<div className="no-todos">Looks like you&apos;re absolutely free today!</div>)
        :''
      }
    </div>
  );
};

export default TodoList;

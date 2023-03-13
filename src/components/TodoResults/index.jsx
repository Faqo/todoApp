import { useSelector } from 'react-redux'
import "./styles.css";

const TodoResults = () => {
  // Fix an ability to calculate completed tasks
  const {done}  = useSelector( state => state.todos );

  return <div className="todo-results">Done: {done}</div>;
};

export default TodoResults;

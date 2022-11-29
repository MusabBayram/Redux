import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggle, destroy, selectFilteredTodos, getTodosAsync } from '../redux/todos/todosSlice';
import Loading from './Loading';


function TodoList() {
	const dispatch = useDispatch();
	const filteredTodos = useSelector(selectFilteredTodos);
	const isLoading = useSelector((state) => state.todos.isLoading);

	useEffect(() => {
		dispatch(getTodosAsync());
	}, [dispatch]);

	const handleDestroy = (id) => {
		if(window.confirm('Are you sure?')){
			dispatch(destroy(id))
		}
	}

	if(isLoading) {
		return <Loading />;
	}

  return (
    <ul className="todo-list">
			{filteredTodos.map((item) => (
				<li key={item.id} className={item.completed ? 'completed' : ''}>
					<div className="view">
						<input 
							className="toggle" 
							type="checkbox" 
							onChange={() => dispatch(toggle({id: item.id}))} 
							checked={item.completed}
						/>
						<label>{item.title}</label>
						<button className="destroy" onClick={() => handleDestroy(item.id)}></button>
					</div>
				</li>
			))}
		</ul>
  )
}

export default TodoList
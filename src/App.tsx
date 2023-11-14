import React, { useState } from 'react';
import './App.css';

type ITodo = {
  id: number,
  title: string,
  completed: boolean
}
type ITodos = {
  todos: ITodo[], //array of ITodo
}

function App() {

  const [task, setTask] = useState<ITodos>({todos: []});
console.log(task);

  const addTodos = (title: string) => {
    setTask({
      todos: [
        {title, completed: false, id: task.todos.length+1},
        ...task.todos
      ]
    })
  }

  const deleteTodos = (id: number) => {
    setTask({
      todos: task.todos.filter(t => t.id !== id)
    })
  }

  const toggleTodos = (id: number) => {
    setTask({
      todos: task.todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)
    });
  }
  return (
    <div className="App">
    <AddTodoComponent addTodos={addTodos}/>      
    <hr />
      <TodosComponent 
        todos={task} 
        toggleTodos={toggleTodos}
        deleteTodos={deleteTodos} />
    </div>
  );
}



const TodosComponent: React.FC<{
  todos: ITodos, 
  toggleTodos: (id: number) => void,
  deleteTodos: (id: number) => void
}> = ({todos, toggleTodos, deleteTodos}) => {
  const deleteTodo = (id: number) => {
    if (window.confirm(`Are you sure you want to delete todo?`)) {
      deleteTodos(id);
    }
  }
  return (
    <div className="section__todos">
    <h2>Todos</h2>
    {todos.todos.length ? <ul className="todos">
      {todos.todos.map(todo => (
        <li key={todo.id}>
          <span style={{textDecoration: todo.completed? 'line-through': 'none'}}>{todo.title}</span>
          <input 
            type="checkbox" 
            checked={todo.completed} 
            onChange={() => toggleTodos(todo.id)} />
          <button onClick={() => {deleteTodo(todo.id)}}>X</button>
        </li>
      ))}
    </ul>: <div>No Todo has been created</div>}
  </div>
  );
};

const AddTodoComponent = ({addTodos} : {addTodos: (text: string) => void}) => {
  const [todo, setTodo] = React.useState<string>("");
  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!todo) {
      alert("Please enter a todo");
    } else {
      addTodos(todo);
      setTodo("");
    }
  };
  return (
    <div className="AddTodo">
      <h1>
        Created with typeScript
      </h1>
      <form>
        <input
          value={todo}
          onChange={e => {setTodo(e.target.value)}} />
        <button onClick={submit}>Add</button>
      </form>
    </div>
  );
};


export default App;

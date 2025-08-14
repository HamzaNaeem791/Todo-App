import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import "./Todo.css";

export default function Todo() {
  let [todos, setTodos] = useState([]);
  let [newTodo, setNewTodo] = useState("");
  let [editId, setEditId] = useState(null);

  // Add new task
  let addNewTask = () => {
    if (newTodo.trim() === "") return;

    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, task: newTodo } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos([
        ...todos,
        { task: newTodo, id: uuidv4(), completed: false },
      ]);
    }

    setNewTodo("");
  };

  // Input change
  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  // Delete task
  let deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit task
  let updateTask = (id) => {
    let taskToEdit = todos.find((todo) => todo.id === id);
    setNewTodo(taskToEdit.task);
    setEditId(id);
  };

  // Toggle complete
  let toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="Box">
      <h3>TODO APP</h3>
      <div className="input-row">
  <input
    className="Box2"
    placeholder="Add a Task"
    value={newTodo}
    onChange={updateTodoValue}
  />
  <button className="Button" onClick={addNewTask}>
    {editId ? "Update" : "Add"}
  </button>
</div>
      <br />
      <br />
      <hr />
      <h4>Todo List</h4>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
  <span className="task-text">{todo.task}</span>
  <div className="actions">
    <button className="Button done" onClick={() => toggleComplete(todo.id)}>✔</button>
    <button className="Button edit" onClick={() => updateTask(todo.id)}>
      <i className="fa-solid fa-pen-to-square"></i>
    </button>
    <button className="Button delete" onClick={() => deleteTask(todo.id)}>
      <i className="fa-solid fa-trash"></i>
    </button>
  </div>
</li>

        ))}
      </ul>
    </div>
  );
}
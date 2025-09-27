import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");      // For input
  const [todos, setTodos] = useState([]);    // For task list
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Add task
  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTodos([...todos, { text: task, completed: false }]);
      setTask(""); // Clear input
    }
  };

  // Delete task
  const handleDeleteTask = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // Toggle completed
  const handleToggleComplete = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // Edit task
  const handleEditTask = (index, text) => {
    setEditIndex(index);
    setEditText(text);
  };

  // Save updated task
  const handleSaveEdit = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text: editText } : todo
    );
    setTodos(newTodos);
    setEditIndex(null);
    setEditText("");
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditText("");
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? "completed" : ""}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(index)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span onClick={() => handleToggleComplete(index)}>
                  {todo.text}
                </span>
                <button onClick={() => handleEditTask(index, todo.text)}>Edit</button>
                <button onClick={() => handleDeleteTask(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

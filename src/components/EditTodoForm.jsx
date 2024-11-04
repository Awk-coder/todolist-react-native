import React, { useState } from "react";

export const EditTodoForm = ({ task, updateTodo, toggleEdit }) => {
  const [newTask, setNewTask] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo(task.id, newTask); // Save updated task
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="todo-input"
      />
      <button type="submit" className="todo-btn">Save</button>
      <button type="button" onClick={() => toggleEdit(task.id)} className="todo-btn">
        Cancel
      </button>
    </form>
  );
};

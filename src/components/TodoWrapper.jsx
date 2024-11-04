import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { CurrentDate } from "./CurrentDate";

export const TodoWrapper = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addTodo = (task) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task, completed: false, editing: false },
    ]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, editing: !todo.editing } : todo
      )
    );
  };

  const updateTodo = (id, updatedTask) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: updatedTask, editing: false } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <div className="yellow">
        <CurrentDate /> {time}
      </div>
      <h1>Today's Glorious Tasks</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) =>
        todo.editing ? (
          <EditTodoForm
            key={todo.id}
            task={todo}
            updateTodo={updateTodo}
            toggleEdit={toggleEdit}
          />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            toggleEdit={toggleEdit}
          />
        )
      )}
    </div>
  );
};

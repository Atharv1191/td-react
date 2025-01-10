import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoItems from './TodoItems';

const Todo = () => {
  // LocalStorage initialization with safer parsing
  const storedTodos = localStorage.getItem('todos');
  const [todoList, setTodoList] = useState(() => {
    try {
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch {
      return [];
    }
  });
  const inputRef = useRef();

  // Function to add a new todo
  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === '') {
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = ''; // Clear input after adding
  };

  // Function to delete a todo by id
  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Function to toggle completion status
  const toggle = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  // Sync todos with localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="todo-container">
      {/* Title */}
      <div className="todo-header">
        <img className="todo-icon" src={todo_icon} alt="Todo Icon" />
        <h1 className="todo-title">To-Do List</h1>
      </div>

      {/* Input Box */}
      <div className="todo-input-box">
        <input
          ref={inputRef}
          type="text"
          className="todo-input"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="todo-add-button"
        >
          ADD +
        </button>
      </div>

      {/* Todo List */}
      <div className="todo-list">
        {todoList.length > 0 ? (
          todoList.map((item) => (
            <TodoItems
              key={item.id}
              id={item.id}
              text={item.text}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          ))
        ) : (
          <p className="empty-message">No tasks yet. Add some!</p>
        )}
      </div>
    </div>
  );
};

export default Todo;

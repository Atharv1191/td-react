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
    <div className="bg-white place-self-center w-full sm:w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl shadow-lg">
      {/* Title */}
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="Todo Icon" />
        <h1 className="font-semibold text-3xl text-gray-700">To-Do List</h1>
      </div>

      {/* Input Box */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600 text-gray-800"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer hover:bg-orange-700"
        >
          ADD +
        </button>
      </div>

      {/* Todo List */}
      <div className="flex flex-col gap-4 sm:gap-2">
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
          <p className="text-gray-500 text-center">No tasks yet. Add some!</p>
        )}
      </div>
    </div>
  );
};

export default Todo;

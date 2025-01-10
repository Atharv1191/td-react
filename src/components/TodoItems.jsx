import React from 'react';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm hover:shadow-lg transition-shadow mb-3">
      {/* Toggle Completion */}
      <div
        className="flex items-center cursor-pointer flex-grow"
        onClick={() => toggle(id)}
      >
        <img
          className="w-6 h-6"
          src={isComplete ? tick : not_tick}
          alt={isComplete ? 'Completed' : 'Not Completed'}
        />
        <p
          className={`text-gray-700 ml-4 text-[15px] ${isComplete ? 'line-through text-gray-500' : ''}`}
        >
          {text}
        </p>
      </div>

      {/* Delete Item */}
      <img
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTodo(id);
          }
        }}
        className="cursor-pointer w-6 h-6 ml-4 transform hover:scale-110 transition-transform"
        src={delete_icon}
        alt="Delete"
      />
    </div>
  );
};

export default TodoItems;

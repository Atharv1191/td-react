import React from 'react';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 sm:p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow mb-4 sm:mb-2">
      {/* Toggle Completion */}
      <div
        className="flex items-center cursor-pointer mb-3 sm:mb-0"
        onClick={() => toggle(id)}
      >
        <img
          className="w-7 sm:w-6"
          src={isComplete ? tick : not_tick}
          alt={isComplete ? 'Completed' : 'Not Completed'}
        />
        <p
          className={`text-gray-700 ml-4 text-lg sm:text-[17px] ${
            isComplete ? 'line-through text-gray-500' : ''
          } break-words`}
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
        className="cursor-pointer w-6 sm:w-5 hover:scale-110 transition-transform"
        src={delete_icon}
        alt="Delete"
      />
    </div>
  );
};

export default TodoItems;

// components/TodoItem.js
import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-checkbox">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            id={`todo-${todo.id}`}
          />
          <label htmlFor={`todo-${todo.id}`}></label>
        </div>
        
        <div className="todo-text">
          {isEditing ? (
            <form onSubmit={handleUpdate} className="edit-form">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
                autoFocus
              />
              <div className="edit-actions">
                <button type="submit" className="save-btn">
                  <i className="fas fa-check"></i>
                </button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </form>
          ) : (
            <>
              <span className={`todo-text-content ${todo.completed ? 'line-through' : ''}`}>
                {todo.text}
              </span>
              {todo.media && (
                <div className="todo-media">
                  {todo.media.type === 'image' ? (
                    <img src={todo.media.url} alt="Todo media" />
                  ) : (
                    <video src={todo.media.url} controls />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {!isEditing && (
        <div className="todo-actions">
          <button 
            className="edit-btn"
            onClick={() => setIsEditing(true)}
            title="Edit task"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button 
            className="delete-btn"
            onClick={() => onDelete(todo.id)}
            title="Delete task"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
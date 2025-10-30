// components/TodoList.js
import React from "react";
import TodoItem from "./TodoItem";

import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";

const TodoList = ({ todo , editingId, onDelete, onUpdate , getPriorityColor , toggleTodo , startEditing , saveEdit , editText , cancelEdit , setEditText , deleteTodo }) => {
  return (
    <div 
      className={`todo-item ${todo.completed ? "completed" : ""} ${
        todo.priority
      }`}
    >
      {/* Checkbox */}
      <div className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          id={`todo-${todo.id}`}
        />
        <label htmlFor={`todo-${todo.id}`}>
          <i className="fas fa-check"></i>
        </label>
      </div>

      {/* Todo Content */}
      <div className="todo-content">
        {editingId === todo.id ? (
          <form className="edit-form" onSubmit={saveEdit}>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="edit-input"
              autoFocus
            />
            <div className="edit-actions">
              <button type="submit" className="save-edit">
                <i className="fas fa-check"></i>
              </button>
              <button
                type="button"
                className="cancel-edit"
                onClick={cancelEdit}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="todo-text">
              <span
                className={`text ${todo.completed ? "completed-text" : ""}`}
              >
                {todo.text}
              </span> 
            </div>

            {todo.media && (
              <div className="todo-media-attachment">
                <div className="media-attachment-header">
                  <i
                    className={`fas ${
                      todo.media.type.startsWith("image/")
                        ? "fa-image"
                        : "fa-video"
                    }`}
                  ></i>
                  <span>Attached Media</span>
                </div>
                <div className="media-content">
                  {todo.media.type.startsWith("image/") ? (
                    <img src={todo.media.url} alt="Todo attachment" />
                  ) : (
                    <video src={todo.media.url} controls />
                  )}
                </div>
                <div className="media-name">{todo.media.name}</div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Actions */}
      {editingId !== todo.id && (
        <div className="todo-actions">
          <button
            className="edit-btn"
            onClick={() => startEditing(todo)}
            title="Edit"
          >
            <CiEdit className="text-xl" />
          </button>
          <button
            className="delete-btn"
            onClick={() => deleteTodo(todo.id)}
            title="Delete"
          >
            <CiTrash className="text-xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;

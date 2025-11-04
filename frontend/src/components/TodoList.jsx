// components/TodoList.js
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router";
// import TodoItem from "./TodoItem";

import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

import { deleteTodo, getAllTodo, updateTodo } from "../features/todo/todoSlice";

const TodoList = ({
  todoList, 
  editText, 
  setEditText,
}) => {
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);

  const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.text);
  };

  const toggleTodo = async (id, value) => {
    const data = {
      isCompleted: value,
    };

    await dispatch(updateTodo({ id, data }));
    await dispatch(getAllTodo());
  };

  const handledeleteTodo = async (id) => {
    await dispatch(deleteTodo(id));
  };


  const handleUpdateTodo = async (id, data) => {
    await dispatch(updateTodo({ id, data })); 
    setEditText('')
    setEditingId(null)
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return todoList.map((todo) => (
    <div
      key={todo._id}
      className={`flex items-start py-2 px-2 border rounded-lg  ${
        todo?.priority == "Low"
          ? "border-green-500/50"
          : todo?.priority == "Medium"
          ? "border-yellow-500/50"
          : "border-red-500/50"
      }   ${todo?.isCompleted ? "completed" : ""} ${todo?.priority}`}
    >
      {/* Checkbox */}
      <button
        type="button"
        onClick={() => toggleTodo(todo?._id, !todo.isCompleted)}
        className={`flex cursor-pointer mr-2 ${
        todo?.priority == "Low"
          ? "text-green-500/50"
          : todo?.priority == "Medium"
          ? "text-yellow-500/50"
          : "text-red-500/50"
      } `}
      >
        {todo?.isCompleted ? (
          <IoIosCheckmarkCircleOutline className={`text-xl    `} />
        ) : (
          <MdOutlineRadioButtonUnchecked className="text-xl " />
        )}
      </button>

      {/* Todo Content */}
      <div className="flex justify-between w-full relative  ">
        <div className=" ">
          {editingId === todo?._id ? (
            <form className="edit-form"  >
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
                autoFocus
              />
              <div className="edit-actions">
                <button onClick={()=> handleUpdateTodo(todo._id, {text: editText}) } type="button" className="save-edit">
                  Done
                </button>
                <button
                  type="button"
                  className="cancel-edit"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="todo-text">
                <span
                  className={`text ${
                    todo?.isCompleted ? "completed-text" : ""
                  }`}
                >
                  {todo?.text}
                </span>
              </div>

              {todo?.media && (
                <div className=" ">
                  <div className=" "> 
                    <span>Attached Media</span>
                  </div>
                  <div className=" relative    ">
                    {todo.mediaType == "image" ? (
                      <img src={todo?.media} alt="Todo attachment" className=" max-h-[200px]  object-contain   "   />
                    ) : (
                      <video src={todo?.media} controls className=" max-h-[200px]" />
                    )}
                    <Link to={todo?.media} className=" absolute top-0 right-0 bg-[#2d2e42] py-1 px-5 rounded-bl-xl      "  >View</Link>
                  </div>
                  <div className="media-name">{todo?.media.name}</div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Actions */}
        {editingId !== todo?._id && (
          <div className="flex gap-2 absolute top-1 right-1  ">
            <button
              className="py-1 px-2 hover:bg-blue-500 rounded-md cursor-pointer "
              onClick={() => startEditing(todo)}
              title="Edit"
            >
              <CiEdit className="text-xl" />
            </button>
            <button
              className="py-1 px-2 hover:bg-red-400 rounded-md cursor-pointer "
              onClick={() => handledeleteTodo(todo?._id)}
              title="Delete"
            >
              <CiTrash className="text-xl" />
            </button>
          </div>
        )}
      </div>
    </div>
  ));
};

export default TodoList;

import React, { useState } from "react";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";

import upload from "../assets/images/upload.png"; 
import { createTodo } from "../features/todo/todoSlice";
import { useDispatch } from "react-redux";

export default function AddTodoForm({ todos , setTodos    }) {
  
  const [newTodo, setNewTodo] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const [showMediaUpload, setShowMediaUpload] = useState(false);
  const [priority, setPriority] = useState('medium');
  const dispatch = useDispatch();




  const addTodo = async (e) => {
    e.preventDefault();
 
    if(newTodo.trim() === '' && media === null) return 

    const formData = new FormData();
    formData.append('media', media);
    formData.append('text',  newTodo.trim());

    await dispatch(createTodo(formData))
     
    setNewTodo('');
    setPriority('medium');
    setMedia(null);
    setMediaType('');
    setShowMediaUpload(false);
 
  };

    const removeMedia = () => {
    setMedia(null);
    setMediaType('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMedia({
          url: event.target.result,
          name: file.name,
          type: file.type
        });
        setMediaType(file.type.startsWith('image/') ? 'image' : 'video');
      };
      reader.readAsDataURL(file);
    }
  };

  
  return (
    <section className="add-todo-section">
      <form className="todo-form" onSubmit={(e) => addTodo(e)}>
        <div className="input-group">
          <div className="text-input-container">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="todo-input"
            />
            <button type="submit" className="add-button">
              <IoAddOutline />
            </button>
          </div>

          <div className="form-options">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>

            <button
              type="button"
              className={`media-toggle-btn cursor-pointer ${showMediaUpload ? "active" : ""}`}
              onClick={() => setShowMediaUpload(!showMediaUpload)}
            > 
              {media ? "Media Added" : "Add Media"}
            </button>
          </div>

          {/* Media Upload Section */}
          {showMediaUpload && (
            <div className=" ">
              <div className=" flex justify-between  ">
                <h4 className="">Add Media</h4>
                <button
                  type="button"
                  className=" px-2 py-1 rounded-tl-md rounded-tr-md bg-white/10 cursor-pointer  "
                  onClick={() => setShowMediaUpload(false)}
                >
                  <IoCloseOutline />
                </button>
              </div>

              <div className=" relative h-15   rounded-tl-md rounded-bl-md rounded-br-md  bg-white/10  ">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  style={{ width: "100%", height: "100%" }}
                  className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 "
                />
                <img src={upload} alt={upload} className=" w-15 mx-auto " />
              </div>

              {/* media preview */}
              {media && (
                <div className="mt-5  ">
                  <div className="flex justify-between ">
                    <span>Preview</span>
                    <button
                      type="button"
                      className="bg-white/10 px-2 py-1 rounded-md cursor-pointer "
                      onClick={removeMedia}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="w-1/2 ">
                    {mediaType === "image" ? (
                      <div className=" ">
                        <img src={media.url} alt="Preview" />
                        <div className=" ">
                          <i className="fas fa-image"></i>
                          <span>{media.name}</span>
                        </div>
                      </div>
                    ) : (
                      <div className=" ">
                        <video src={media.url} controls />
                        <div className=" ">
                          <i className="fas fa-video"></i>
                          <span>{media.name}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </form>
    </section>
  );
}

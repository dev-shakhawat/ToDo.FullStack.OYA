import React from "react";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";

export default function AddTodoForm({setNewTodo , newTodo , addTodo , priority , setPriority , media , mediaType ,  showMediaUpload , setShowMediaUpload , handleFileChange , upload , removeMedia }) {
  return (
    <section className="add-todo-section">
      <form className="todo-form" onSubmit={addTodo}>
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
              className={`media-toggle-btn ${showMediaUpload ? "active" : ""}`}
              onClick={() => setShowMediaUpload(!showMediaUpload)}
            >
              <i className="fas fa-paperclip"></i>
              {media ? "Media Added" : "Add Media"}
            </button>
          </div>

          {/* Media Upload Section */}
          {showMediaUpload && (
            <div className=" ">
              <div className=" flex justify-between  ">
                <h4>Add Media</h4>
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
                <img src={upload} alt={upload.src} className=" w-15 mx-auto " />
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

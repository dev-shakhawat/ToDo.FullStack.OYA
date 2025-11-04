import React, { useState, useEffect } from "react";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import uploadIcon from "../assets/images/upload.png"; 
import { createTodo } from "../features/todo/todoSlice";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AddTodoForm() {

  const [newTodo, setNewTodo] = useState("");
  const [media, setMedia] = useState(null);        
  const [mediaType, setMediaType] = useState("");  
  const [preview, setPreview] = useState(null);    
  const [showMediaUpload, setShowMediaUpload] = useState(false);
  const [priority, setPriority] = useState("Medium");
  const [adding , setAdding] = useState(false)
  
  const dispatch = useDispatch();

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file); // store File object
      setMediaType(file.type.startsWith("image/") ? "image" : "video");
    }
  };

  // Generate preview
  useEffect(() => {
    if (!media) {
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(media);
  }, [media]);

  // Remove media
  const removeMedia = () => {
    setMedia(null);
    setPreview(null);
    setMediaType("");
  };

  // Submit form
  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === "" && !media) return;

    setAdding(true)

    const formData = new FormData();
    formData.append("text", newTodo.trim());
    formData.append("priority", priority);
    if (media) formData.append("media", media);

    try {
      await dispatch(createTodo(formData));
      setNewTodo("");
      setPriority("Medium");
      removeMedia();
      setShowMediaUpload(false);
      setAdding(false)
    } catch (err) {
      setAdding(false)
      console.error("Todo creation failed:", err);
    }
  };

  return (
    <section className="add-todo-section">
      <form className="todo-form" onSubmit={addTodo}>
        <div className="input-group">
          {/* Text input */}
          <div className="text-input-container">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="todo-input"
            />
            <button type="submit" className="add-button">
              
              {  adding ?  <AiOutlineLoading3Quarters className="animate-spin" /> : <IoAddOutline /> }
            </button>
          </div>

          {/* Options: priority + media toggle */}
          <div className="form-options">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>

            <button
              type="button"
              className={`media-toggle-btn ${showMediaUpload ? "active" : ""}`}
              onClick={() => setShowMediaUpload(!showMediaUpload)}
            >
              {media ? "Media Added" : "Add Media"}
            </button>
          </div>

          {/* Media Upload */}
          {showMediaUpload && (
            <div className="media-upload-section mt-2">
              <div className="flex justify-between items-center mb-2">
                <h4>Add Media</h4>
                <button type="button" onClick={() => setShowMediaUpload(false)}>
                  <IoCloseOutline />
                </button>
              </div>

              <div className="relative rounded bg-white/10 p-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <img src={uploadIcon} alt="Upload" className="w-12 mx-auto" />
              </div>

              {/* Preview */}
              {preview && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span>Preview</span>
                    <button
                      type="button"
                      className="bg-white/10 px-2 py-1 rounded-md"
                      onClick={removeMedia}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="w-1/2">
                    {mediaType === "image" ? (
                      <img src={preview} alt="Preview" className="w-full" />
                    ) : (
                      <video src={preview} controls className="w-full" />
                    )}
                    <div className="mt-1 text-sm">{media.name}</div>
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

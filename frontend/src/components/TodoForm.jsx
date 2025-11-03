// components/TodoForm.js
import React, { useState, useRef } from 'react';

const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd({
        text: text.trim(),
        media: media ? { type: mediaType, url: media } : null
      });
      setText('');
      setMedia(null);
      setMediaType('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMedia(event.target.result);
        setMediaType(file.type.startsWith('image/') ? 'image' : 'video');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder=">_ Enter new task..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">
          <i className="fas fa-plus"></i> Add Task
        </button>
      </div>
      <div className="media-upload">
        <label className="upload-btn">
          <i className="fas fa-paperclip"></i> Attach Media
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,video/*"
            style={{ display: 'none' }}
          />
        </label>
        {media && (
          <div className="media-preview">
            {mediaType === 'image' ? (
              <img src={media} alt="Preview" className="preview" />
            ) : (
              <video src={media} className="preview" controls />
            )}
            <button 
              type="button" 
              className="remove-media"
              onClick={() => setMedia(null)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
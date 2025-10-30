import React from "react";

export default function TaskButton({filter , setFilter , text , items}) {
  return (
    <button
      className={`filter-btn capitalize ${filter === text ? "active" : ""}`}
      onClick={() => setFilter(text)}
    >
      <i className="fas fa-list"></i>
      {text} ({items})
    </button>
  );
}

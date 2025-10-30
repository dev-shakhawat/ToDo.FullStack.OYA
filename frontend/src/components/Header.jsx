import React from "react";

import logo from "../assets/images/logo.png";

export default function Header({ activeTodos, completedTodos }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img src={logo} alt={logo.src} className="w-20" />
          <div className="logo-text">
            <h1>Quantum Task</h1>
            <p>Organize your life beautifully</p>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat">
            <span className="stat-number">{activeTodos}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat">
            <span className="stat-number">{completedTodos}</span>
            <span className="stat-label">Done</span>
          </div>
        </div>
      </div>
    </header>
  );
}

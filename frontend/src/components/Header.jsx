// components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <i className="fas fa-terminal"></i>
        <h1>CyberTask</h1>
      </div>
      <div className="subtitle">
        <span className="typing-animation">System initialized. Ready for task management.</span>
      </div>
    </header>
  );
};

export default Header;
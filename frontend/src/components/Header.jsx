// components/Header.js
import React from 'react';
import logo from "../../src/assets/images/logo.png";

const Header = () => {
  return (
    <header className="flex py-5 gap-10  ">
      <div className="logo">
        <img src={logo} alt={logo.src} className='w-20' />
      </div>
      <div className="subtitle">
        <h2 className="text-blue-400 font-bold text-xl  ">Quantum Task</h2>
        <span className="typing-animation">System initialized. Ready for task management.</span>
      </div>
    </header>
  );
};

export default Header;
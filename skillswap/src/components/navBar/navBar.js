import React from "react";
import "./navBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <h2>SkillSwap</h2>
      <div className="navbar-links">
        <ul>
          <button id="navBtn">Sign In</button>
          <button id="navBtn">Sign Up</button>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

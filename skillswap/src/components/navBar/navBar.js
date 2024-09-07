import React from "react";
import "./navBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <h2>SkillSwap</h2>
      <div className="navbar-links">
        <ul>
          <button>Sign In</button>
          <button>Sign Up</button>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

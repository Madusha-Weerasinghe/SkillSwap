import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./signIn.css";
import { signin } from "../../service/signIn/signInService";
import { useNavigate } from "react-router-dom";

const Overlay = ({ show, onClose }) => {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    logIn();

    console.log(userData);
    // onClose(); // Close the overlay after submission
  };

  const logIn = async () => {
    try {
      const data = await signin(text, password);

      setUserData(data);

      if (data) {
        navigate(`/community/${data.user._id}`);
      } else {
        alert("email or password incorrect");
      }
    } catch (error) {
      throw error;
    }
  };

  if (!show) return null;

  return (
    <div className="overlay">
      <div className="overlay-content">
        <FontAwesomeIcon
          icon={faTimes}
          className="close-icon"
          onClick={onClose}
          id="closeIcon"
        />

        <p>
          <span id="title">Sign In</span>
          <br></br>
          <span id="subTitle">Stay proficient by learning new skills.</span>
        </p>
        <p>
          <span id="email">Email</span>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Email"
          />
        </p>

        <p>
          <span id="password">Password</span>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </p>

        {userData && (
          <>
            <p>Email or Password incorrect</p>
          </>
        )}

        <p>
          <a href="#">Forget Password?</a>
        </p>

        <button id="signInBtn" onClick={handleSubmit}>
          Sign In
        </button>
        <br></br>
      </div>
    </div>
  );
};

export default Overlay;

import React, { useState } from "react";
import NavBar from "../../components/navBar/navBar";
import "./welcomePage.css";
import arrow from "../../assets/img/welcomePage/arrows2.png";
import SignInOverlay from "../../components/signIn/signIn";

const MyPage = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div className="welcomePage">
      <NavBar></NavBar>

      <div className="container">
        <div className="right">
          <p>
            <span id="headText">SkillSwap</span>
            <br></br>

            <span id="subText">"Learn, Share, and Thrive Together"</span>
            <br></br>
            <br></br>
            <span id="discription">
              Join a thriving global community where individuals share skills,
              learn from one another, and grow together. Discover new talents,
              teach what you know, and collaborate for continuous personal and
              collective development.
            </span>
          </p>

          <div className="btnContainer">
            <div className="leftBtn">
              <button id="signIn" onClick={toggleOverlay}>
                Sign In
              </button>
            </div>
            <div className="rightBtn">
              <button id="signUp">Sign Up</button>
            </div>
          </div>
        </div>

        <SignInOverlay show={showOverlay} onClose={toggleOverlay} />

        <div className="left">
          <img src={arrow} alt="Swap arrows" className="image" />
        </div>
      </div>
    </div>
  );
};

export default MyPage;

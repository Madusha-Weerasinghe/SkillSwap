import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./agreement.css";
import { getUserById } from "../../service/userService";
import hanshake from "../../assets/gif/agreement/handshake2.gif";
import { createAgreement } from "../../service/agreementService/agreementService";

import { useNavigate } from "react-router-dom";

const Overlay = ({ show, onClose, user, id }) => {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  const [mySwapSkill, setmySwapSkill] = useState("");
  const [partnerSkill, setPartnerSkill] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const [otherUser, setOtherUser] = useState(null);

  const handleSendAgreement = async () => {
    createAgreement(user[0]._id, id, selectedDate, mySwapSkill, partnerSkill);
  };

  const handleAgreementClose = async () => {
    setmySwapSkill("");
    setPartnerSkill("");
    setSelectedDate("");
    onClose();
  };

  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  const getUser = async () => {
    const userID = id;
    if (id) {
      const data = await getUserById(userID);
      console.log(data);
      setOtherUser(data);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  if (!show) return null;

  return (
    <div className="overlay">
      <div className="overlay-content">
        <FontAwesomeIcon
          icon={faTimes}
          className="close-icon"
          onClick={handleAgreementClose}
          id="closeIcon"
        />

        <p id="titleContainer">
          <span id="agreementTitle">SkilSwap Agreement</span>
          <br></br>
          <br></br>
        </p>
        <div className="agreementOverlayContainer">
          <div className="parteners">
            <div className="nameTitle">
              <span id="titlePartner">Me</span>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <p>
              <span id="mySkill">My skils *</span>
              <br></br>

              <select
                id="SwapSkillBox"
                value={mySwapSkill}
                onChange={(e) => setmySwapSkill(e.target.value)}
              >
                <option id="selectSkill" value="">
                  Select a skill
                </option>
                {user[0].skils.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </p>
          </div>
          <div>
            <img
              src={hanshake}
              alt="A fun GIF"
              style={{
                width: "80px",
                marginLeft: "8%",
                marginTop: "10px",
              }}
            />
          </div>
          {otherUser && otherUser.length > 0 ? (
            <>
              <div className="parteners">
                <div className="nameTitle">{otherUser[0].name}</div>
                <br></br>
                <br></br>
                <br></br>
                <p>
                  <span id="mySkill">Partner's skils *</span>
                  <br></br>

                  <select
                    id="SwapSkillBox"
                    value={partnerSkill}
                    onChange={(e) => setPartnerSkill(e.target.value)}
                  >
                    <option id="selectSkill" value="">
                      Select a skill
                    </option>
                    {otherUser[0].skils.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                </p>
              </div>
            </>
          ) : (
            <span>No user data available</span>
          )}
        </div>

        <div className="dateSection">
          <label htmlFor="datePicker">Select a date: </label>
          <input type="date" id="datePicker" onChange={handleDateChange} />
          {selectedDate && (
            <div>
              <p id="selectedDate">
                Selected Date: {selectedDate.toDateString()}
              </p>
            </div>
          )}
        </div>
        <div className="agreementBtn">
          <button id="agreeBtn" onClick={handleSendAgreement}>
            Send Agreement
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;

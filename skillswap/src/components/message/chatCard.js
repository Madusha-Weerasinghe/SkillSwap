import React, { useState, useEffect } from "react";
import "./chatCard.css";
import propic from "../../assets/img/chatCard/propic.jpg";
import { getUserById } from "../../service/userService";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";

const ChatCard = ({ id, setChatId }) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const userID = id;

    const data = await getUserById(userID);
    console.log(data);
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleClick = () => {
    setChatId(id);
    console.log(user);
  };
  return (
    <div className="chatCard" onClick={handleClick}>
      <div className="chatCardLeft">
        <img src={propic} alt="Swap arrows" className="propic" />
      </div>

      <div className="chatName">
        {user && user.length > 0 ? (
          <>
            <span id="chatName">{user[0].name}</span>
            <br />
            <span id="lastMessage">hey bro</span>
          </>
        ) : (
          <span>No user data available</span>
        )}
      </div>
    </div>
  );
};

export default ChatCard;

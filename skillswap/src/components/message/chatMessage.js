import React, { useState, useEffect } from "react";
import "./chatMessage.css";

const ChatMessage = ({ message, time }) => {
  const convertToLocalTime = (isoString) => {
    const date = new Date(isoString); // Create a Date object
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Set to true for 12-hour format
    };
    return date.toLocaleTimeString([], options); // Return formatted local time
  };

  const localTime = convertToLocalTime(time);
  return (
    <div className="chatMessage">
      <span id="messageId">{message}</span>
      <div className="time">{localTime}</div>
    </div>
  );
};

export default ChatMessage;

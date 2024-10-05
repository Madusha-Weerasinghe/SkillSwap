import React, { useState } from "react";
import "./messageInput.css";
import { sendMessage } from "../../service/messageService/messageService";
import send from "../../assets/img/message/send.png";

const ChatInput = ({ chatId, socket }) => {
  const [text, setText] = useState("");

  const sendBtnFunction = async () => {
    if (!text.trim()) return;

    // Send the message via your API service
    await sendMessage(chatId, text);

    // Emit the message through the socket
    socket.emit("sendMessage", {
      chatId: chatId,
      message: text,
    });

    setText("");
  };

  return (
    <div className="messageInput">
      <div className="input">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message"
          id="messageText"
          rows="1"
          style={{
            width: "100%",
            resize: "vertical",
            padding: "5px",

            border: "1px solid black",
            borderRadius: "15px",
          }}
        />
      </div>
      <div className="sendBtn">
        <img src={send} onClick={sendBtnFunction} id="sendIcon" />
      </div>
    </div>
  );
};

export default ChatInput;

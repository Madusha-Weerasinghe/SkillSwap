import React, { useState } from "react";
import "./messageInput.css";
import { sendMessage } from "../../service/messageService/messageService";

const ChatInput = ({ chatId, socket }) => {
  const [text, setText] = useState("");

  const sendBtnFunction = async () => {
    if (!text.trim()) return; // Do nothing if the input is empty

    // Send the message via your API service
    await sendMessage(chatId, text);

    // Emit the message through the socket
    socket.emit("sendMessage", {
      chatId: chatId,
      message: text,
    });

    // Clear the text input after sending
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
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
      <div className="sendBtn">
        <button id="send" onClick={sendBtnFunction}>
          send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;

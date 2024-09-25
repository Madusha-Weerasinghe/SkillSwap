import React, { useState, useEffect } from "react";
import "./message.css";
import ChatCard from "../../components/message/chatCard";
import { getUser } from "../../service/userService";
import { getAllMessage } from "../../service/messageService/messageService";
import ChatMessage from "../../components/message/chatMessage";
import ChatInput from "../../components/message/messageInput";
import { io } from "socket.io-client";
import ChatMessageLeft from "../../components/message/chatMessageSend";

// Initialize socket globally
const socket = io("http://localhost:8070");

const Chat = () => {
  const [user, setUser] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  const getUserData = async () => {
    try {
      const userData = await getUser();
      setUser(userData); // Set user data
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getMessageById = async () => {
    try {
      const messageData = await getAllMessage(chatId);
      setMessages(messageData); // Set message data
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (user && user[0].following) {
      getMessageById();
    }
  }, [chatId]);

  useEffect(() => {
    // Receive messages via socket
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data found.</div>;
  }

  return (
    <div className="chatContainer">
      <div className="menubar">menu</div>
      <div className="chatlist">
        <div className="chats">
          <span id="chattitle">Your Chats</span>
        </div>
        {user[0].following && user[0].following.length > 0 ? (
          user[0].following.map((follower, index) => (
            <ChatCard key={index} id={follower} setChatId={setChatId} />
          ))
        ) : (
          <div>No followers to display</div>
        )}
      </div>
      <div className="chat">
        <div className="chatlog">
          <span id="chatlogtitle">chat</span>
        </div>
        <div className="messages">
          {messages && messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id} className="message">
                {message.sender === chatId ? (
                  <>
                    <ChatMessage
                      message={message.message}
                      time={message.timestamp}
                    />
                  </>
                ) : (
                  <>
                    <ChatMessageLeft
                      message={message.message}
                      time={message.timestamp}
                    />
                  </>
                )}
              </div>
            ))
          ) : (
            <div>No messages available</div>
          )}
        </div>
        <div className="sendMessage">
          <ChatInput chatId={chatId} socket={socket} /> {/* Pass socket */}
        </div>
      </div>
    </div>
  );
};

export default Chat;

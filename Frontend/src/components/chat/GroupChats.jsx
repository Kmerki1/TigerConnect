import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/group-chats.css";
import Separator from "../Separator.jsx";
import { getToken, getUserId } from "../../utils/auth.js";
import CONFIG from "../../../../config";
import { useParams } from "react-router-dom";

const groupChatData = [
  {
    id: 1,
    path: "/chat/javascript-enthusiasts",
    avatarUrl: "https://via.placeholder.com/50",
    name: "JavaScript Enthusiasts",
    messages: [],
  },
  {
    id: 2,
    path: "/chat/react-developers",
    avatarUrl: "https://via.placeholder.com/50",
    name: "React Developers",
    messages: [],
  },
  {
    id: 3,
    path: "/chat/frontend-coders",
    avatarUrl: "https://via.placeholder.com/50",
    name: "Frontend Coders",
    messages: [],
  },
  {
    id: 4,
    path: "/chat/backend-wizards",
    avatarUrl: "https://via.placeholder.com/50",
    name: "Backend Wizards",
    messages: [],
  },
  {
    id: 5,
    path: "/chat/fullstack-masters",
    avatarUrl: "https://via.placeholder.com/50",
    name: "Fullstack Masters",
    messages: [],
  },
];

const GroupChats = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatMessagesRef = useRef(null);
  const currentUserId = getUserId();
  const id = params.id || currentUserId;
  const isCurrentUser = id === currentUserId;
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = getToken();
        const response = await fetch(`${CONFIG.API_URL}/users/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        console.error("Error fetching current user:", error.message);
      }
    };

    fetchCurrentUser();
  }, [id]);

  useEffect(() => {
    if (selectedChat) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, selectedChat]);

  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
    // Load messages of the selected chat
    setMessages(chat.messages);
  };

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      try {
        const token = getToken();
        const response = await fetch(`${CONFIG.API_URL}/users/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { displayName } = await response.json();

        const newMessage = {
          user: displayName,
          content: inputMessage,
        };
        setMessages([...messages, newMessage]);
        setInputMessage("");
      } catch (error) {
        console.error("Error fetching user name:", error.message);
      }
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="group-chat-container">
      <div className="group-chat-list">
        <h2>Group Chats</h2>
        <ul>
          {groupChatData.map((chat) => (
            <li key={chat.id} onClick={() => handleChatSelection(chat)}>
              {chat.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="selected-chat">
        {selectedChat ? (
          <>
            <h2>{selectedChat.name}</h2>
            <div className="chat-messages" ref={chatMessagesRef}>
              {messages.map((message, index) => (
                <div className="message" key={index}>
                  <img src="https://via.placeholder.com/40" alt="User Avatar" />
                  <div className="message-content">
                    <h4>{message.user}</h4>
                    <p className="message__text">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={handleInputChange}
              />
              <button className="btn" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </>
        ) : (
          <p>Select a group chat to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default GroupChats;

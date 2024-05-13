import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/group-chats.css";
import Separator from "../Separator.jsx";
import { getToken, getUserId } from "../../utils/auth.js";
import CONFIG from "../../../../config";
import { useParams } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const GroupChats = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State for controlling popup visibility
  const [newChatName, setNewChatName] = useState(""); // State for new group chat name
  const chatMessagesRef = useRef(null);
  const currentUserId = getUserId();
  const id = params.id || currentUserId;
  const isCurrentUser = id === currentUserId;
  const [currentUser, setCurrentUser] = useState(null);
  const [groupChatData, setGroupChatData] = useState([
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
  ]);

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

  const handleCreateGroupChat = () => {
    setShowPopup(true);
  };

  const handleCancelCreateGroupChat = () => {
    setShowPopup(false);
  };

  const handleAddGroupChat = () => {
    if (newChatName.trim() !== "") {
      const newGroupChat = {
        id: groupChatData.length + 1,
        path: `/chat/${newChatName.toLowerCase().replace(/\s+/g, "-")}`,
        avatarUrl: "https://via.placeholder.com/50",
        name: newChatName,
        messages: [],
      };

      // Add new group chat to the list
      setGroupChatData([...groupChatData, newGroupChat]);
      setShowPopup(false);
    }
  };

  const handleDeleteChat = (chatId) => {
    const updatedChats = groupChatData.filter((chat) => chat.id !== chatId);
    setGroupChatData(updatedChats);
    setSelectedChat(null);
    setMessages([]);
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="group-chat-container">
      <div className="group-chat-list">
        <h2 className="groupchats-title">
          Group Chats{" "}
          <CiCirclePlus
            style={{ marginLeft: "17px", cursor: "pointer" }}
            onClick={handleCreateGroupChat}
          />
        </h2>
        <ul>
          {groupChatData.map((chat) => (
            <li key={chat.id} onClick={() => handleChatSelection(chat)}>
              {chat.name}{" "}
            </li>
          ))}
        </ul>
      </div>
      <div className="selected-chat">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <h2>{selectedChat.name}</h2>{" "}
              <RiDeleteBin6Line
                className="delete-icon"
                onClick={() => handleDeleteChat(selectedChat.id)}
              />
            </div>
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
      {/* Popup for creating a new group chat */}
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h2>Create New Group Chat</h2>
            <input
              type="text"
              placeholder="Enter Group Chat Name"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
            />
            <div className="popup-buttons">
              <button className="btn" onClick={handleAddGroupChat}>
                Add
              </button>
              <button className="btn" onClick={handleCancelCreateGroupChat}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupChats;

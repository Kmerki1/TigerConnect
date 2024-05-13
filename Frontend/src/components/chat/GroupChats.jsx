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
  const [showPopup, setShowPopup] = useState(false);
  const [newChatName, setNewChatName] = useState("");
  const chatMessagesRef = useRef(null);
  const currentUserId = getUserId();
  const id = params.id || currentUserId;
  const isCurrentUser = id === currentUserId;
  const [currentUser, setCurrentUser] = useState(null);
  const [groupChatData, setGroupChatData] = useState([]);

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

  useEffect(() => {
    const fetchGroupChatsForUser = async () => {
      const token = getToken();
      try {
        console.log(currentUserId);
        const response = await fetch(
          `${CONFIG.API_URL}/groupChatsUser/${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const chats = await response.json();
        console.log(chats);
        setGroupChatData(chats);
      } catch (error) {
        console.error("Failed to fetch group chats for user:", error.message);
      }
    };

    if (currentUserId) {
      fetchGroupChatsForUser();
    }
  }, [currentUserId]); // This effect depends on the currentUserId

  console.log("test");

  const handleSendMessage = async () => {
    try {
      if (inputMessage.trim() !== "") {
        const token = getToken();
        if (!currentUser || !selectedChat) {
          console.error("Current user or selected chat is not defined.");
          return;
        }
        const response = await fetch(
          `${CONFIG.API_URL}/group/${selectedChat.chatName}/addMessages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              senderDisplayName: currentUser.displayName,
              message: inputMessage,
            }),
          }
        );
        if (!response.ok) {
          const errorDetails = await response.json();
          console.error("HTTP Error Response:", errorDetails);
          throw new Error(
            `HTTP error! Status: ${response.status}, Details: ${errorDetails}`
          );
        }
        const newMessage = await response.json();
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage("");

        // Scroll to bottom after sending message
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };
  console.log(messages);
  const fetchMessages = async () => {
    const token = getToken();
    try {
      const response = await fetch(
        `${CONFIG.API_URL}/group/${selectedChat.chatName}/getMessages`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch messages with status: ${response.status}`
        );
      }
      const chatMessages = await response.json();
      setMessages(chatMessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error.message);
    }
  };

  const handleChatSelection = async (chat) => {
    setSelectedChat(chat);
    const token = getToken();
    const response = await fetch(
      `${CONFIG.API_URL}/group/${chat.chatName}/getMessages`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const chatMessages = await response.json();
      setMessages(chatMessages);
    } else {
      console.error(`Failed to fetch messages for ${chat.name}`);
    }
  };

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleCreateGroupChat = () => {
    setShowPopup(true);
  };

  const handleCancelCreateGroupChat = () => {
    setShowPopup(false);
  };

  const handleAddGroupChat = async () => {
    const token = getToken();
    if (newChatName.trim() !== "") {
      try {
        const response = await fetch(`${CONFIG.API_URL}/groupchats`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            chatName: newChatName,
            members: [getUserId()], // assuming the creator is the first member
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newGroupChat = await response.json();
        setGroupChatData([...groupChatData, newGroupChat]);
        setShowPopup(false);
        setNewChatName("");
      } catch (error) {
        console.error("Failed to create group chat:", error.message);
      }
    }
  };

  const handleDeleteChat = async (chatId) => {
    const token = getToken();
    try {
        const response = await fetch(`${CONFIG.API_URL}/groupchats/${chatId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updatedChats = groupChatData.filter((chat) => chat._id !== chatId);
        setGroupChatData(updatedChats);
        setSelectedChat(null);
        setMessages([]);
    } catch (error) {
        console.error("Error deleting chat:", error.message);
    }
};

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
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
          {groupChatData.map((chat, index) => (
            <li key={index} onClick={() => handleChatSelection(chat)}>
              {chat.chatName}{" "}
            </li>
          ))}
        </ul>
      </div>
      <div className="selected-chat">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <h2>{selectedChat.chatName}</h2>{" "}
              <RiDeleteBin6Line
                className="delete-icon"
                onClick={() => handleDeleteChat(selectedChat._id)}
              />
            </div>
            <div className="chat-messages-container">
              <div className="chat-messages" ref={chatMessagesRef}>
                {messages.map((message, index) => (
                  <div className="message" key={index}>
                    <img
                      src="https://via.placeholder.com/40"
                      alt="User Avatar"
                    />
                    <div className="message-content">
                      <h4>{message.senderDisplayName}</h4>
                      <p className="message__text">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
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

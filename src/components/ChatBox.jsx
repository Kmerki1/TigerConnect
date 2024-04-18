import React, { useState } from 'react';
import '../styles/chat-box.css';

function ChatBox({ chatType, chatId }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    // Fetch messages based on chatType and chatId
    const fetchMessages = () => {
        const fetchedMessages = [
            { id: 1, user: 'John', content: 'Hello!' },
            { id: 2, user: 'Jane', content: 'Hi there!' },
            // ...
        ];
        setMessages(fetchedMessages);
    };

    const handleInputChange = (event) => {
        setInputMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            const newMessage = {
                id: messages.length + 1,
                user: 'You',
                content: inputMessage,
            };
            setMessages([...messages, newMessage]);
            setInputMessage('');
        }
    };

    // Fetch messages when the component mounts or chatId changes
    React.useEffect(() => {
        fetchMessages();
    }, [chatId]);

    return (
        <div className="chat-box">
            <div className="chat-header">
                <h2>{chatType === 'group' ? 'Group Chat' : 'Direct Message'}</h2>
            </div>
            <div className="chat-messages">
                {messages.map((message) => (
                    <div key={message.id} className="message">
                        <strong>{message.user}: </strong>
                        <span>{message.content}</span>
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
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatBox;
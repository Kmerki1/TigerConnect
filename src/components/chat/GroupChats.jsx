import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/group-chats.css';

function GroupChats() {
    return (
        <div>
            <h2>Group Chats</h2>
            <div className="group-chat-list">
                <Link to="/chat/web-programming-400" className="group-chat-item">
                    <img src="https://via.placeholder.com/50" alt="Group Avatar" />
                    <div className="group-chat-info">
                        <h3>Web Programming 400</h3>
                        <i>Victor: when are we meeting...</i>
                    </div>
                </Link>
                <Link to="/chat/tu-webdev-club" className="group-chat-item">
                    <img src="https://via.placeholder.com/50" alt="Group Avatar" />
                    <div className="group-chat-info">
                        <h3>TU WebDev Club</h3>
                        <i>Steve: next meeting is 5pm...</i>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default GroupChats;
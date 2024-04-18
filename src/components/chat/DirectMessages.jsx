import React from 'react';
import { Link } from 'react-router-dom';
import ChatBox from './ChatBox';
import '../styles/direct-messages.css';

function DirectMessages() {
    const directMessages = [
        { id: 1, user: 'John' },
        { id: 2, user: 'Jane' },
        // ...
    ];

    return (
        <div className="direct-messages">
            <h2>Direct Messages</h2>
            <div className="dm-list">
                {directMessages.map((dm) => (
                    <Link key={dm.id} to={`/dm/${dm.id}`}>
                        {dm.user}
                    </Link>
                ))}
            </div>
            <ChatBox chatType="dm" chatId={123} />
        </div>
    );
}

export default DirectMessages;
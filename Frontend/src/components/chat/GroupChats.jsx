import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/group-chats.css';

const groupChatData = [
    {
        id: 1,
        path: "/chat/javascript-enthusiasts",
        avatarUrl: "https://via.placeholder.com/50",
        name: "JavaScript Enthusiasts"
    },
    {
        id: 2,
        path: "/chat/react-developers",
        avatarUrl: "https://via.placeholder.com/50",
        name: "React Developers"
    },
    {
        id: 3,
        path: "/chat/frontend-coders",
        avatarUrl: "https://via.placeholder.com/50",
        name: "Frontend Coders"
    },
    {
        id: 4,
        path: "/chat/backend-wizards",
        avatarUrl: "https://via.placeholder.com/50",
        name: "Backend Wizards"
    },
    {
        id: 5,
        path: "/chat/fullstack-masters",
        avatarUrl: "https://via.placeholder.com/50",
        name: "Fullstack Masters"
    },
    {
        id: 6,
        path: "/chat/ui-ux-designers",
        avatarUrl: "https://via.placeholder.com/50",
        name: "UI/UX Designers"
    },
    {
        id: 7,
        path: "/chat/database-admins",
        avatarUrl: "https://via.placeholder.com/50",
        name: "Database Admins"
    },
    {
        id: 8,
        path: "/chat/devops-crew",
        avatarUrl: "https://via.placeholder.com/50",
        name: "DevOps Crew"
    },
    {
        id: 9,
        path: "/chat/qa-testers",
        avatarUrl: "https://via.placeholder.com/50",
        name: "QA Testers"
    },
    {
        id: 10,
        path: "/chat/tech-bloggers",
        avatarUrl: "https://via.placeholder.com/50",
        name: "Tech Bloggers"
    }
];


const GroupChat = (data) => {
    return (
        <Link to={data.path} className="group-chat-item">
            <img src={data.avatarUrl} alt="Group Avatar" />
            <div className="group-chat-info">
                <h3>{data.name}</h3>
            </div>
        </Link>
    )
}

function GroupChats() {

    return (
        groupChatData.map(data => GroupChat(data))
    )
}

export default GroupChats;
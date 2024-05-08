import React from 'react';
import "../styles/post.css"
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons"
import CONFIG from "../../../config";
import {getToken, getUserId} from "../utils/auth";

const formatDate = (dateString) => {
    if (!dateString) return 'Post doesn\'t have a date';

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const formatLikes = (likesArray) => {
    return likesArray.length;
}

function Post({id, name, tag, content, date, likes}) {
    const currentUserID = getUserId();

    const isLiked = likes.includes(currentUserID);

    const handleLike = async () => {
        const token = getToken();
        if (!token) {
            alert("You need to be logged in to like posts.");
            return;
        }

        const response = await fetch(`${CONFIG.API_URL}/like/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Could not like the post");
        }
    }

    return (
        <div className="post">
            <div className="post-header">
                <img className="post__avatar" src="https://placehold.co/45x45"/>
                <div className="post__user-container">
                    <h3 className="post__display-name">{name}</h3>
                    {/* TODO: LINK TO ACTUAL USER'S PROFILE */}
                    <Link to="/profile"><span className="post__username">@{tag}</span></Link>
                </div>
            </div>
            <div className="post-content">
                <p>{content}</p>
            </div>
            <div className="post-footer">
                <span className="post-date">{formatDate(date)}</span>
                <div className="post-likes">
                    <IconContext.Provider value={{style: {fontSize: '25px', color: " #FFBB00"}}}>
                        <div className='icon-wrapper' onClick={handleLike}>
                            {isLiked ? <FaHeart/> : <FaRegHeart/>}
                        </div>
                        <span className="likes">{formatLikes(likes)}</span>
                    </IconContext.Provider>
                </div>
            </div>
        </div>
    )
}

function YourPost({id, name, tag, content, date, likes}) {
    return (
        <div className="post">
            <div className="post-content">
                <p>{content}</p>
            </div>
            <div className="post-footer">
                <span className="post-date">{date}</span>
                <div className="post-likes">
                    <IconContext.Provider value={{style: {fontSize: '25px', color: " #FFBB00"}}}>
                        <FaRegHeart/>
                        <span className="likes">{likes}</span>
                    </IconContext.Provider>
                </div>
            </div>
        </div>
    )
}

export {Post, YourPost};
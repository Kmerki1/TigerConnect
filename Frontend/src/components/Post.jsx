import React from 'react';
import "../styles/post.css"
import { Link } from 'react-router-dom';

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons"

export default function Post({id, name, tag, content, date, likes}) {
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
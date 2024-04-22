import React from 'react';
import "../styles/post.css"

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons"

export default function Post({id, name, tag, content, date, likes}) {
    return (
        <div className="post">
            <div className="post-header">
                <h3 className="post-title">{name}</h3>
                <span className="post-tag">{tag}</span>
            </div>
            <div className="post-content">
                <p>{content}</p>
            </div>
            <div className="post-footer">
                <span className="post-date">{date}</span>
                <div className="post-likes">
                    <IconContext.Provider value={{style: {fontSize: '30px', color: " #FFBB00"}}}>
                            <FaRegHeart/>
                            <span className="likes">{likes}</span>
                    </IconContext.Provider>
                </div>
            </div>
        </div>
    )
}
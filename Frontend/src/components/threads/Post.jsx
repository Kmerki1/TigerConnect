import React, {useState} from 'react';
import "../../styles/post.css"
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import { IconContext } from "react-icons"
import CONFIG from "../../../../config";
import {getToken, getUserId} from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import ThreadModal from "./Thread";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

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

const formatReplies = (repliesArray) => {
    return repliesArray ? repliesArray.length : 0;
}

function Post({id, userId, name, tag, content, date, likes, replies}) {
    const navigate = useNavigate();
    const currentUserID = getUserId();
    const isLiked = likes.includes(currentUserID);
    const [liked, setLiked] = useState(isLiked);
    const [animate, setAnimate] = useState(false);

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
        if (!liked) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 400);
        }
        setLiked(pre => !pre);
    }

    const goToThread = () => {
        navigate(`/thread/${id}`);
    };

    const [showThread, setShowThread] = useState(false);

    const handleOpenThread = () => setShowThread(true);
    const handleCloseThread = () => setShowThread(false);

    return (
        <div className="post">
            <div className="post-header">
                <img className="post__avatar" src="https://placehold.co/45x45"/>
                <div className="post__user-container">
                    <h3 className="post__display-name">{name}</h3>
                    <Link to={`/profile/${userId}`}><span className="post__username">@{tag}</span></Link>
                </div>
            </div>
            <div className="post-content">
                <p>{content}</p>
            </div>
            <div className="post-footer">
                <span className="post-date">{formatDate(date)}</span>


                <Modal open={showThread} onClose={handleCloseThread} center>
                    <ThreadModal initialPost={{id, userId, name, tag, content, date, likes}}/>
                </Modal>

                <div className="post-likes">
                    <IconContext.Provider value={{style: {fontSize: '25px', color: " #FFBB00"}}}>
                        <div className='widget-wrapper'>
                            <div className={`icon-wrapper ${animate ? 'icon-pop' : ''}`} onClick={handleLike}>
                                {liked ? <FaHeart/> : <FaRegHeart/>}
                            </div>
                            <span className="likes">{formatLikes(likes)}</span>
                        </div>
                    </IconContext.Provider>

                    <IconContext.Provider value={{style: {fontSize: '25px', color: " #FFBB00"}}}>

                        <div className='widget-wrapper'>
                            <div className="icon-wrapper" onClick={handleOpenThread}>
                                <FaRegComment/>
                            </div>
                            <span className="likes">{formatReplies(replies)}</span>
                        </div>
                    </IconContext.Provider>
                </div>
            </div>
        </div>
)
}

export {
    Post
};
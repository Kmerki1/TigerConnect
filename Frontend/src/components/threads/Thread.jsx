import React, { useEffect, useState } from 'react';
import { Post } from './Post';
import CONFIG from '../../../../config';
import { getToken } from '../../utils/auth';
import '../../styles/thread.css'

function ThreadModal({ initialPost }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newReply, setNewReply] = useState("");

    console.log('test')
    const fetchReplies = async () => {
        const token = getToken();
        if (!token) {
            console.error("No token found!");
            return;
        }
        try {
            const response = await fetch(`${CONFIG.API_URL}/get-replies/${initialPost.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const data = await response.json();
            if (response.ok) {
                setPosts(data);
            } else {
                throw new Error(data.message || "Failed to fetch replies");
            }
        } catch (error) {
            console.error('Error fetching replies:', error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchReplies();
    }, []);


    const handleReplySubmit = async () => {
        const token = getToken();

        const response = await fetch(`${CONFIG.API_URL}/reply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ content: newReply, rootPostId: initialPost.id })
        });

        if (response.ok) {
            fetchReplies();
            setNewReply(""); // Clear input after posting
        } else {
            alert("Failed to post!");
        }
    };


    const handleReplyChange = (event) => {
        setNewReply(event.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }
console.log(initialPost)
    return (
        <div className="thread-container">


            <Post
                id={initialPost.id}
                userId={initialPost.userId}
                name={initialPost.name}
                tag={initialPost.tag}
                content={initialPost.content}
                date={initialPost.date}
                likes={initialPost.likes}
                replies={initialPost.replies}
            />
            <div className="create-post">
                <input type="text" placeholder="What should I reply?" value={newReply} onChange={handleReplyChange}/>
                <button className="post-button" onClick={handleReplySubmit}>Reply</button>
            </div>
            {posts.map(post => {
                console.log(post)
                return (
                <Post key={post.id}
                      id={post.id}
                      userId={post.userId}
                      name={post.displayName}
                      tag={post.username}
                      content={post.content}
                      date={post.time}
                      likes={post.likes}
                      replies={post.replies}
                />
            )})}
        </div>
    );
}

export default ThreadModal;

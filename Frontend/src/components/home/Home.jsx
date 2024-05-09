import React, {useEffect, useState} from "react";
import "../Post.jsx";
import { Post } from "../Post.jsx";
import "../../styles/home.css";
import Separator from "../Separator.jsx";
import {getToken} from "../../utils/auth";
import CONFIG from "../../../../config";

function Home() {
  const [postsData, setPostsData] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = async () => {
    const token = getToken();
    if (!token) {
      alert("You are not logged in!");
      return;
    }

    const response = await fetch(`${CONFIG.API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content: newPost })
    });

    if (response.ok) {
      setNewPost(""); // Clear input after posting
    } else {
      alert("Failed to post!");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${CONFIG.API_URL}/posts`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const posts = await response.json();
        setPostsData(posts);
      } else {
        // Handle errors or unauthorized access
        console.error('Failed to fetch posts:', response.statusText);
      }
    };

    fetchPosts();
  }, [handlePostSubmit]);


  const handlePostChange = (event) => {
    setNewPost(event.target.value);
  };




  return (
    <div className="home-container">
      <div className="posts-container">
        <div className="create-post">
          <input type="text" placeholder="What should I post?" value={newPost} onChange={handlePostChange} />
          <button className="post-button" onClick={handlePostSubmit}>Post</button>
        </div>
        <div className="post-section">
          {postsData.map((post, index) => (
              <div key={post.id}>
                <Post
                    id={post.id}
                    userId={post.userId}
                    name={post.displayName}
                    tag={post.username}
                    content={post.content}
                    date={post.time}
                    likes={post.likes}
                />
                {index < postsData.length - 1 && <Separator />}
              </div>
          ))}
        </div>
      </div>
      <div className="sidebar">
        <h3>Events</h3>
      </div>
    </div>
  );
}

export default Home;

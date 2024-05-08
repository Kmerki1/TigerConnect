import React, {useEffect, useState} from "react";
import "../Post.jsx";
import { Post } from "../Post.jsx";
import "../../styles/home.css";
import Separator from "../Separator.jsx";
import {getToken} from "../../utils/auth";

function Home() {
  const [postsData, setPostsData] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = async () => {
    const token = getToken();
    if (!token) {
      alert("You are not logged in!");
      return;
    }

    const response = await fetch('http://localhost:5000/api/posts', {
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
      const response = await fetch('http://localhost:5000/api/posts', {
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
    <div id="home-container">
      <div id="posts-container">
        <div id="create-post">
          <input type="text" placeholder="What should I post?" value={newPost} onChange={handlePostChange} />
          <button id="post-button" onClick={handlePostSubmit}>Post</button>
        </div>
        <div id="posts" className="post-section">
          {postsData.map((post, index) => (
              <div key={post.id}>
                <Post
                    id={post.id}
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
      <div id="sidebar">
        <h3>Sidebar</h3>
      </div>
    </div>
  );
}

export default Home;

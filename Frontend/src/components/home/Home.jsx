import React, {useEffect, useState} from "react";
import { Post } from "../threads/Post.jsx";
import "../../styles/home.css";
import Separator from "../Separator.jsx";
import {getToken, getUserId} from "../../utils/auth";
import CONFIG from "../../../../config";

function Home() {
  const id = getUserId();
  const [userData, setUserData] = useState({});
  const [postsData, setPostsData] = useState([]);
  const [newPost, setNewPost] = useState("");

  const fetchPosts = async () => {
    try {
      const token = getToken();
      const response = await fetch(`${CONFIG.API_URL}/posts-home-feed`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const posts = await response.json();
        setPostsData(posts);
      } else {
        // Handle errors or unauthorized access
        console.error("Failed to fetch posts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePostSubmit = async () => {
    const token = getToken();

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
      fetchPosts();
    } else {
      alert("Failed to post!");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getToken();
        const response = await fetch(`${CONFIG.API_URL}/users/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
          return data.following;
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchUser();
    fetchPosts();
  },[])



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
                    replies={post.replies}
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

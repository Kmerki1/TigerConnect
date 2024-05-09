import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/profile.css";
import {Post} from "../Post.jsx";
import Separator from "../Separator.jsx";
import { useParams } from 'react-router-dom'
import {getToken, getUserId} from '../../utils/auth.js';
import CONFIG from "../../../../config";

function Profile() {
  const params = useParams();
  const id = params.id || getUserId();
  const navigate = useNavigate();
  const currentUserId = getUserId();
  const [postsData, setPostsData] = useState([]);

  const isCurrentUser = id === currentUserId;


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = getToken();
        const response = await fetch(`${CONFIG.API_URL}/posts?userIds=${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setPostsData(data);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);


  const author = {
    user_id: "12345",
    profile_pic: "Frontend/public/img/profile_pic.jpg",
    username: "example_username",
    display_name: "Jane Doe",
    bio: "I am a bio...",
    follower_count: 1000,
    following_count: 150,
  };

  const handleFollowButtonClick = () => {};

  const toSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="profile-container">
      <div className="profile-side">
        <div>
          <img src={author.profile_pic} alt="profile picture" id="profile-pic" />
          <div id="info">
            <div id="profile-names">
              <h2 id="profile-name">{author.display_name}</h2>
              <h3 id="username">@{author.username}</h3>
            </div>
            <h3 id="bio">{author.bio}</h3>
            <div id="follow-info">
              <h3>Following: {author.following_count}</h3>
              <h3>Followers: {author.follower_count}</h3>
            </div>
          </div>
        </div>


        <div className="button-container">
          {
            isCurrentUser
                ? <button type="button" id="settings-button" onClick={toSettings}>Settings</button>
                : <button id="follow-button" onClick={handleFollowButtonClick}>Follow</button>
          }
        </div>

      </div>

      <div className="post-section">
        {postsData.map((post, index) => (
            <div key={post.id}>
            <Post
              id={post.id}
              name={post.author}
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
  );
}

export default Profile;

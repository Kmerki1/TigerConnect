import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/profile.css";
import {Post} from "../threads/Post.jsx";
import Separator from "../Separator.jsx";
import { useParams } from 'react-router-dom'
import {getToken, getUserId} from '../../utils/auth.js';
import CONFIG from "../../../../config";

function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const [userData, setUserData] = useState({
    _id: '',
    displayName: '',
    username: '',
    email: '',
    bio: '',
    following: [],
    followers: []
  });
  const currentUserId = getUserId();
  const id = params.id || getUserId();
  const isCurrentUser = id === currentUserId;
  const isFollowing  = () => userData.followers.includes(currentUserId);
  const [postsData, setPostsData] = useState([]);

  console.log(isFollowing())

  const handleFollowButtonClick = async () => {
    try {
      const token = getToken();

      const apiUrl = `${CONFIG.API_URL}/${isFollowing() ? 'unfollow' : 'follow'}/${id}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      fetchUser();
      if (response.ok) {
        if (isFollowing) {
          console.log('Successfully unfollowed the user');
        } else {
          console.log('Successfully followed the user');
        }
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error handling follow button click:', error.message);
    }
  };

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
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = getToken();
        const response = await fetch(`${CONFIG.API_URL}/posts-by-user?userIds=${id}`, {
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

    fetchUser();
    fetchPosts();
  }, []);



  const toSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="profile-container">
      <div className="profile-side">
        <div>
          <img src={userData.profile_pic} alt="profile picture" id="profile-pic" />
          <div id="info">
            <div id="profile-names">
              <h2 id="profile-name">{userData.displayName}</h2>
              <h3 id="username">@{userData.username}</h3>
            </div>
            <h3 id="bio">{userData.bio}</h3>
            <div id="follow-info">
              <h3>Following: {userData.following.length}</h3>
              <h3>Followers: {userData.followers.length}</h3>
            </div>
          </div>
        </div>


        <div className="button-container">
          {
            isCurrentUser
                ? <button type="button" id="settings-button" onClick={toSettings}>Settings</button>
                : <button id="follow-button" onClick={handleFollowButtonClick}>{isFollowing() ? 'Unfollow' : 'Follow'}</button>
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

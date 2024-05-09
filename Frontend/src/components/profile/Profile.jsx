import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/profile.css";
import { YourPost } from "../Post.jsx";
import Separator from "../Separator.jsx";
import { useParams } from 'react-router-dom'
import { getUserId } from '../../utils/auth.js';

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState(null);
  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getUserId();
      setCurrentUserId(userId);
    };
    fetchUserId();
  }, []);

  const isCurrentUser = id === currentUserId;

  const author = {
    user_id: "12345",
    profile_pic: "Frontend/public/img/profile_pic.jpg",
    username: "example_username",
    display_name: "Jane Doe",
    bio: "I am a bio...",
    follower_count: 1000,
    following_count: 150,
  };

  const postsData = [
    {
      id: 1,
      content: "This is my first post",
      time: "4/9/2024 4:28pm",
      likes: 10,
    },
    {
      id: 2,
      content: "This is my second post",
      time: "4/10/2024 7:17am",
      likes: 7,
    },
    {
      id: 3,
      content: "This is my third post",
      time: "4/11/2024 2:09am",
      likes: 12,
    },
    {
      id: 4,
      content: "This is my fourth post",
      time: "4/12/2024 1:47pm",
      likes: 23,
    },
  ];

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

        {
          isCurrentUser &&
        <div className="button-container">
          <button type="button" id="settings-button" onClick={toSettings}>
            Settings
          </button>
          <button id="follow-button" onClick={handleFollowButtonClick}>
            Follow
          </button>
        </div>
        }
      </div>

      <div className="post-section">
        {postsData.map((post, index) => (
          <div key={post.id}>
            <YourPost
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

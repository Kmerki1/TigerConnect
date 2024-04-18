import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();

    const author = {
        user_id: '12345',
        profile_pic: '/img/profile_pic.jpg',
        username: 'example_username',
        display_name: 'Jane Doe',
        bio: 'I am a bio...',
        follower_count: 1000,
        following_count: 150,
    };

    const postsData = [
        {
            id: 1,
            content: 'This is my first post',
            time: '4/9/2024 4:28pm',
            likes: 10,
        },
        // ...
    ];

    const handleFollowButtonClick = () => {
        // Perform follow logic here
    };

    const toSettings = () => {
        navigate('/settings');
    };

    return (
        <div>
            <div id="profile-header">
                <img src={author.profile_pic} alt="profile picture" />
                <div id="info">
                    <h2 id="profile-name">{author.display_name}</h2>
                    <h3 id="username">@{author.username}</h3>
                    <h3 id="bio">{author.bio}</h3>
                    <div id="follow-info">
                        <h3>Following: {author.following_count}</h3>
                        <h3>Followers: {author.follower_count}</h3>
                    </div>
                </div>
                <div id="button-div">
                    <button type="button" id="settings-button" onClick={toSettings}>
                        Settings
                    </button>
                </div>
            </div>
            <div id="posts">
                {postsData.map((post) => (
                    <div className="post" key={post.id}>
                        <h4 className="post-author">{author.display_name}</h4>
                        <h5 className="post-username">@{author.username}</h5>
                        <p className="post-content">{post.content}</p>
                        <div className="post-info">
                            <p className="post-time">{post.time}</p>
                            <p className="post-likes">Likes: {post.likes}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button id="follow-button" onClick={handleFollowButtonClick}>
                Follow
            </button>
        </div>
    );
}

export default Profile;
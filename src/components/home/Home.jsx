import React from 'react';

function Home() {
    const postsData = [
        {
            "id": 1,
            "author": "Jackson Patel",
            "username": "IdeaJunkie87",
            "content": "Just had a thought provoking conversation that left be buzzing with ideas!",
            "time": "4/9/2024 4:28pm",
            "likes": 10,
        },
        {
            "id": 2,
            "author": "Isabella Lopez",
            "username": "CozyCorner123",
            "content": "Weekend plans: Netflix, cozy blanket, and a big mug of tea.",
            "time": "4/10/2024 7:17am",
            "likes": 7,
        },
        {
            "id": 3,
            "author": "Noah Thompson",
            "username": "BookWormExplorer",
            "content": "Sometimes the best adventures are found in the pages of a book. What's your current literary escape?",
            "time": "4/11/2024 2:09am",
            "likes": 12,
        },
        {
            "id": 4,
            "author": "Ava Carter",
            "username": "ZenSpirit21",
            "content": "Today's mantra: Embrace the chaos and find beauty in the mess.",
            "time": "4/12/2024 1:47pm",
            "likes": 23,
        },
    ];
    return (
        <div>
            <div id="posts">
                {postsData.map((post) => (
                    <div className="post" key={post.id}>
                        <h4 className="post-author">{post.author}</h4>
                        <h5 className="post-username">@{post.username}</h5>
                        <p className="post-content">{post.content}</p>
                        <div className="post-info">
                            <p className="post-time">{post.time}</p>
                            <p className="post-likes">Likes: {post.likes}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
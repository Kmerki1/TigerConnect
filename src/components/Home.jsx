import React from 'react';

function Home() {
    const postsData = [
        {
            id: 1,
            author: 'Jackson Patel',
            username: 'IdeaJunkie87',
            content: 'Just had a thought provoking conversation that left be buzzing with ideas!',
            time: '4/9/2024 4:28pm',
            likes: 10,
        },
        // ...
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
// Consider a json object such as:
/**
 * {
  "tweet_id": "1234567890123456789",
  "author": {
    "user_id": "9876543210987654321",
    "username": "example_user",
    "display_name": "John Doe",
    "verified": false,
    "followers_count": 1000,
    "following_count": 500
  },
  "content": "This is an example tweet!",
  "created_at": "2024-04-09T12:00:00Z",
  "retweet_count": 10,
  "favorite_count": 20,
  "hashtags": ["example", "tweet"],
  "mentions": ["user1", "user2"],
  "urls": ["https://example.com"],
  "reply_to_tweet_id": "9876543210987654321",
  "reply_to_user_id": "1234567890123456789",
  "is_reply": true
}

 */


document.addEventListener("DOMContentLoaded", function () {
  function authorInformation() {
    const author =  {
      "user_id": "12345",
      "profile_pic": "/img/profile_pic.jpg",
      "username": "example_username",
      "display_name": "Jane Doe",
      "bio": "I am a bio...",
      "follower_count": 1000,
      "following_count": 150
    }

    const profilePic = document.querySelector("#profile-header img");
    profilePic.src = author.profile_pic;
    profilePic.alt = "Profile Picture";

    const profileNAme = document.getElementById("profile-name");
    profileNAme.textContent = author.display_name;

    const username = document.getElementById("username");
    username.textcontent = "@" + author.username;

    const bio = document.getElementById("bio");
    bio.textContent =  author.bio;

    const followInfo = document.getElementById("follow-info");
    followInfo.children[0].textContent = "Following: " + author.following_count;
    followInfo.children[1].textContent = "Followers: " + author.follower_count

  }


  function showPosts() {
    const postsData = [
      {
        "id": 1,
        "content": "This is my first post",
        "time": "4/9/2024 4:28pm",
        "likes": 10,
      },
      {
        "id": 2,
        "content": "This is my second post",
        "time": "4/10/2024 7:17am",
        "likes": 7,
      },
      {
        "id": 3,
        "content": "This is my third post",
        "time": "4/11/2024 2:09am",
        "likes": 12,
      },
      {
        "id": 4,
        "content": "This is my fourth post",
        "time": "4/12/2024 1:47pm",
        "likes": 23,
      },
    ];

    const postsContainer = document.getElementById("posts");

    postsData.forEach(postText => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML =
        `<p class="post-content">${postText.content}</p>
        <div class="post-info">
         <p class="post-time">${postText.time}</p>
         <p class="post-likes">Likes: ${postText.likes}</p>
        </div>`;
        postsContainer.appendChild(postElement);
        if (postsContainer == null) {
            console.log("container empty");
        } else {
            console.log(postElement.innerHTML);
        }
    });
  }

  let follows = false;

  function handleFollowButtonClick() {
    const followButton = document.getElementById("follow-button");
    followButton.addEventListener("click", function() {
        if (follows == false) {
            follows = true;
            followButton.innerHTML = "Unfollow";
        } else {
            const confirmed = confirm("Are you sure you want to unfollow this account?");
            if (confirmed) {
                follows = false;
                followButton.innerHTML = "Follow";
            }
        }
    });

    followButton.addEventListener("mousedown", function() {
        followButton.style.backgroundColor = "gray";
    });

    followButton.addEventListener("mouseup", function() {
        followButton.style.backgroundColor = "#FFBB00";
    });
  }

  authorInformation();
  showPosts();
  handleFollowButtonClick();
});

document.addEventListener("DOMContentLoaded", function () {
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

  showPosts();
  handleFollowButtonClick();
});

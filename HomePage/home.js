document.addEventListener("DOMContentLoaded", function () {
    function showPosts() {
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

        const postsContainer = document.getElementById("posts");

        postsData.forEach(postText => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML =
            `<h4 class="post-author">${postText.author}</h4>
             <h5 class="post-username">@${postText.username}</h5>
            <p class="post-content">${postText.content}</p>
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

      }

      var homePostsDiv = document.querySelector('#posts');
      homePostsDiv.style.marginTop = '0';

      showPosts();
});
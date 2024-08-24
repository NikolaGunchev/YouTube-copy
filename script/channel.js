import { users } from "./userData.js";
import { getVideo } from "../data/videos.js";
import { getChannel } from "../data/channels.js";
import { changeHeader } from "./utils/changeHeader.js";

function renderPage() {
  let activeProfile = JSON.parse(localStorage.getItem("active"));
  let historyHtml = "";
  let likedHtml = "";
  let showUserHtml='';

  users.userData.forEach((user) => {
    if (user.name === activeProfile) {
      showUserHtml=`
      <p class="main-name">${activeProfile}</p>
      <p class="sub-name">@${activeProfile}</p>
      `

      for (let i = 0; i < Math.min(user.history.length, 6); i++) {
        const video = user.history[i];

        let matchingVideo = getVideo(video);

        historyHtml += `
        <div class="video">
          <div class="image-box">
          <a class='video-link' href='watch.html?videoId=${matchingVideo.id}'>
            <img src=${matchingVideo.thumbnail}>
          </a>
            <div class="video-time">${matchingVideo.videoTime}</div>
          </div>
          <div class="video-title">
          <a class='video-link' href='watch.html?videoId=${matchingVideo.id}'>
            <p>${matchingVideo.title}</p>
          </a>
            <img src="./pictures/icons/youtube-vertical-dots.svg" />
          </div>
          <div class="video-info">
            <p>${matchingVideo.channel}</p>
            <p>${matchingVideo.views} views</p>
            <p>&middot; ${matchingVideo.date} ago</p>
          </div>
        </div>
        `;
      }

      for (let i = 0; i < Math.min(user.likedVideos.length, 6); i++) {
        const video = user.likedVideos[i];

        let matchingVideo = getVideo(video);

        likedHtml += `
        <div class="video">
          <div class="image-box">
          <a class='video-link' href='watch.html?videoId=${matchingVideo.id}'>
            <img src=${matchingVideo.thumbnail}>
          </a>
            <div class="video-time">${matchingVideo.videoTime}</div>
          </div>
          <div class="video-title">
          <a class='video-link' href='watch.html?videoId=${matchingVideo.id}'>
            <p>${matchingVideo.title}</p>
          </a>
            <img src="./pictures/icons/youtube-vertical-dots.svg" />
          </div>
          <div class="video-info">
            <p>${matchingVideo.channel}</p>
            <p>${matchingVideo.views} views</p>
            <p>&middot; ${matchingVideo.date} ago</p>
          </div>
        </div>
        `;
      }
    }
  });

  document.querySelector('.js-current-channel-user').innerHTML=showUserHtml;
  document.querySelector(".js-history-grid").innerHTML = historyHtml;
  document.querySelector(".js-liked-grid").innerHTML = likedHtml;

  function changeSidebar() {
    const sideBarContainer = document.querySelector(".sidebar-container");
    const body = document.body;
    if (sideBarContainer.classList.contains("short-sidebar-active")) {
      sideBarContainer.classList.remove("short-sidebar-active");
      body.classList.remove("short-sidebar-active");
    } else {
      sideBarContainer.classList.add("short-sidebar-active");
      body.classList.add("short-sidebar-active");
    }
  }

  document.querySelector(".hamburger-menu").addEventListener("click", () => {
    changeSidebar();
  });

  function loadSubscribers() {
    let subsHtml = ``;

    users.userData.forEach((user) => {
      if (user.name === activeProfile) {
        user.subscribers.forEach((sub) => {
          let matchingSub = getChannel(sub);

          subsHtml += `
          <div class="profile">
            <img src=${matchingSub.profilePic} />
            <p>${matchingSub.name}</p>
          </div>
          `;
        });
      }
    });
    return subsHtml;
  }

  document.querySelector(".js-sub-container").innerHTML = loadSubscribers();

  changeHeader(activeProfile, renderPage);
}
renderPage();



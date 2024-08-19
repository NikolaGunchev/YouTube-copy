import { users } from "./userData.js";
import { getVideo } from "../data/videos.js";
import { getChannel } from "../data/channels.js";
let activeProfile = JSON.parse(localStorage.getItem("active"));

function renderPage() {
  let historyHtml = "";
  let likedHtml='';

  users.userData.forEach((user) => {
    if (user.name === activeProfile) {
      for (let i = 0; i < Math.min(user.history.length, 6); i++) {
        const video = user.history[i];

        let matchingVideo = getVideo(video);

        historyHtml += `
        <div class="video">
          <div class="image-box">
            <img src=${matchingVideo.thumbnail}>
            <div class="video-time">${matchingVideo.videoTime}</div>
          </div>
          <div class="video-title">
            <p>${matchingVideo.title}</p>
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
            <img src=${matchingVideo.thumbnail}>
            <div class="video-time">${matchingVideo.videoTime}</div>
          </div>
          <div class="video-title">
            <p>${matchingVideo.title}</p>
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

  document.querySelector(".js-history-grid").innerHTML = historyHtml;
  document.querySelector('.js-liked-grid').innerHTML=likedHtml;

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

  function loadSubscribers(){
    let subsHtml=``

    users.userData.forEach(user=>{
      if (user.name===activeProfile) {
        user.subscribers.forEach(sub=>{
          let matchingSub=getChannel(sub)

          subsHtml+=`
          <div class="profile">
            <img src=${matchingSub.profilePic} />
            <p>${matchingSub.name}</p>
          </div>
          `
        })
      }
    })
    return subsHtml
  }
  
  document.querySelector('.js-sub-container').innerHTML=loadSubscribers()
}
renderPage();

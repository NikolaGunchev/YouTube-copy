import { getVideo, videos } from "../data/videos.js";
import { shuffleArray } from "./utils/shuffle.js";
import { getChannel } from "../data/channels.js";
import { users } from "./userData.js";
import { changeHeader } from "./utils/changeHeader.js";

console.log(users.userData);

function renderPage() {
  let activeProfile = JSON.parse(localStorage.getItem("active"));
  let html = "";
  let videosCopy = videos;
  shuffleArray(videosCopy);

  videosCopy.forEach((video) => {
    let matchingVideo = getVideo(video.id);
    let matchingChannel = getChannel(matchingVideo.channel);
    html += `
        <div class="video-preview">
          <div class="image-box">
            <a
            class="video-link"
            href="watch.html?videoId=${video.id}"
            >
           <img src="${matchingVideo.thumbnail}" class="thumbnail" />
            </a>
            
            <div class="video-time">${matchingVideo.videoTime}</div>
          </div>
          <div class="video-info-grid">
            <div class="channel-pic">
              <img
                src="${matchingChannel.profilePic}"
                class="profile-pic"
              />
            </div>
            <div class="information">
              <p class="video-title">
                <a
                  class="video-link"
                  href="watch.html?videoId=${video.id}"
                >
                  ${matchingVideo.title}
                </a>
              </p>
              <p class="channel-name">${matchingChannel.name}</p>
              <p class="channel-misc">${matchingVideo.views} views &#183; ${matchingVideo.date} ago</p>
            </div>
          </div>
        </div>
        `;
  });

  document.querySelector(".js-video-grid").innerHTML = html;

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

  changeHeader(activeProfile, renderPage);
}
renderPage();

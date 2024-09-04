import { users } from "./userData.js";
import { getVideo } from "../data/videos.js";
import { getChannel } from "../data/channels.js";
import { changeHeader } from "./utils/changeHeader.js";
import { searchBar } from "./utils/searchBar.js";
import { loadSubscribers } from "./utils/loadSubscribers.js";
import { changeSidebar } from "./utils/changeSidebar.js";
console.log(users.userData);

function renderPage() {
  let activeProfile = JSON.parse(localStorage.getItem("active"));
  let bigHtml = "";
  let smallHtml = "";
  let firstVideoBox = document.querySelector(".js-first-video-box");

  users.userData.forEach((user) => {
    if (user.name === activeProfile) {
      user.watchLater.forEach((video, i) => {
        let matchingVideo = getVideo(video);
        if (i === 0) {
          let matchingVideoBig = getVideo(video);
          bigHtml = `
          <div class="content">
            <div class="image-box">
              <img src=${matchingVideoBig.thumbnail}>
            </div>
            <div class=video-box-text>
            <h1>Watch later</h1>
            <p class="text1">${activeProfile}</p>
            <p class="text2">${user.watchLater.length} videos</p>
            </div>
         </div>
          `;
          firstVideoBox.style.setProperty(
            "--background-url",
            `url(../${matchingVideoBig.thumbnail})`
          );
        }

        smallHtml += `
     <div class="video">
        <div class="video-number">${i + 1}</div>
        <div class="image-box-video">
          <a class='video-link' href='watch.html?videoId=${matchingVideo.id}'>
            <img src=${matchingVideo.thumbnail}>
          </a>
            <div class="video-time">${matchingVideo.videoTime}</div>
        </div>
        <div class="video-content">
          <div class="video-text">
          <a class='video-link' href='watch.html?videoId=${matchingVideo.id}'>
            <p class="text3">${matchingVideo.title}</p>
            </a>
            <p class="text4">${matchingVideo.channel} &middot; ${
          matchingVideo.views
        } views &middot; ${matchingVideo.date} ago</p>
          </div>
          <div class="video-options">
            <img src="pictures/icons/youtube-vertical-dots.svg">
          </div>
        </div>
      </div>
        `;
      });
    }
    if (activeProfile === "notLogged") {
      firstVideoBox.style.display = "none";
    }
  });

  document.querySelector(".js-first-video-box").innerHTML = bigHtml;
  document.querySelector(".js-video-list").innerHTML = smallHtml;

  document.querySelector(".hamburger-menu").addEventListener("click", () => {
    changeSidebar();
  });

  document.querySelector(".js-sub-container").innerHTML = loadSubscribers(
    users,
    getChannel,
    activeProfile
  );

  changeHeader(activeProfile, renderPage);

  searchBar();
}
renderPage();

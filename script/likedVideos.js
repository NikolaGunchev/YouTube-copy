import { users } from "./userData.js";
import { getVideo } from "../data/videos.js";
import { getChannel } from "../data/channels.js";
import { changeHeader } from "./utils/changeHeader.js";
console.log(users.userData);

function renderPage() {
  let activeProfile = JSON.parse(localStorage.getItem("active"));
  let bigHtml = "";
  let smallHtml = "";
  let firstVideoBox = document.querySelector(".js-first-video-box");

  users.userData.forEach((user) => {
    if (user.name === activeProfile) {
      user.likedVideos.forEach((video, i) => {
        let matchingVideo = getVideo(video);
        if (i === 0) {
          let matchingVideoBig = getVideo(video);
          bigHtml = `
          <div class="content">
            <div class="image-box">
              <img src=${matchingVideoBig.thumbnail}>
            </div>
            <div class=video-box-text>
            <h1>Liked videos</h1>
            <p class="text1">${activeProfile}</p>
            <p class="text2">${user.likedVideos.length} videos</p>
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

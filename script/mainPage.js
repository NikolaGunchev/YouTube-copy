import { getVideo, videos } from "../data/videos.js";
import { shuffleArray } from "./utils/shuffle.js";
import { getChannel } from "../data/channels.js";
import { users } from "./userData.js";
import { changeHeader } from "./utils/changeHeader.js";
import { searchBar } from "./utils/searchBar.js";
import { loadSubscribers } from "./utils/loadSubscribers.js";
import { changeSidebar } from "./utils/changeSidebar.js";

console.log(users.userData);

function renderPage() {
  let activeProfile = JSON.parse(localStorage.getItem("active")) || "notLogged";
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
              <div class="information-header">
                <p class="video-title">
                  <a
                    class="video-link"
                    href="watch.html?videoId=${video.id}"
                  >
                  ${matchingVideo.title}
                  </a>
                </p>
                <div class="video-settings-box">
                  <img src="pictures/icons/youtube-vertical-dots.svg" class="video-settings" data-video-id='${matchingVideo.id}'>
                  <div class="settings-popup">
                    <div class="popup-setting watch-later-option" data-video-id='${matchingVideo.id}'>
                      <img src="pictures/icons/watch-later.svg">
                      <p class='js-popup-watchLater-text'>Add video to watch later list</p>
                    </div>
                  </div>
                </div>
              </div>
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

  document.querySelector(".js-sub-container").innerHTML = loadSubscribers(
    users,
    getChannel,
    activeProfile
  );

  changeHeader(activeProfile, renderPage);

  searchBar();

  //Show and hide video settings button
  let popup = document.querySelectorAll(".settings-popup");
  let settingsBox = document.querySelectorAll(".video-settings");
  let optionText = document.querySelectorAll(".js-popup-watchLater-text");
  settingsBox.forEach((but, i) => {
    but.addEventListener("click", () => {
      const videoId = but.dataset.videoId;
      let videoFound = false;
      if (popup[i].style.display === "none" || popup[i].style.display === "") {
        popup[i].style.display = "block";
      } else {
        popup[i].style.display = "none";
      }

      movePopupX(popup[i]);
      movePopupY(popup[i]);

      users.userData.forEach((user) => {
        if (user.name === activeProfile) {
          user.watchLater.forEach((video) => {
            if (video === videoId) {
              videoFound = true;
            }
          });

          if (videoFound) {
            optionText[i].innerHTML = "Remove video from watch later list";
          } else {
            optionText[i].innerHTML = "Add video to watch later list";
          }
        }
      });
    });

    //Hide video settings when clicking anywhere on the screen
    document.addEventListener("click", function (event) {
      // Check if the click is outside the popup
      if (!popup[i].contains(event.target) && event.target !== but) {
        popup[i].style.display = "none";
      }
    });
  });

  //Adding and removing videos from the watch later list
  document.querySelectorAll(".watch-later-option").forEach((option, i) => {
    option.addEventListener("click", () => {
      let popup = document.querySelectorAll(".settings-popup");
      const videoId = option.dataset.videoId;

      users.watchLaterButton(activeProfile, videoId);
      popup[i].style.display = "none";
    });
  });

  function movePopupX(popup) {
    const rect = popup.getBoundingClientRect();
    const elementX = rect.left;
    const elementWidth = rect.width;
    const viewportWidth = window.innerWidth;

    if (elementX + elementWidth > viewportWidth) {
      popup.style.right = `${0}px`;
    }
  }

  function movePopupY(popup){
    const rect = popup.getBoundingClientRect();
    const elementY = rect.bottom;
    const elementHeight = rect.height;
    const viewportHeight = window.innerHeight;

    if (elementY + elementHeight > viewportHeight) {
      popup.style.bottom = `${45}px`;
    }
  }
}
renderPage();

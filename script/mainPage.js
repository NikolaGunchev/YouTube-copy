import { getVideo, videos } from "../data/videos.js";
import { shuffleArray } from "./utils/shuffle.js";

function renderPage() {
  let html = "";
  let videosCopy = videos;
  shuffleArray(videosCopy);

  videosCopy.forEach((video) => {
    let matchingVideo = getVideo(video.id);
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
                src="${matchingVideo.profilePic}"
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
              <p class="channel-name">${matchingVideo.channel}</p>
              <p class="channel-misc">${matchingVideo.views} views &#183; ${matchingVideo.date} ago</p>
            </div>
          </div>
        </div>
        `;
  });

  document.querySelector(".js-video-grid").innerHTML = html;

  document.querySelector(".hamburger-menu").addEventListener("click", () => {
    changeSidebar()
   });
}
renderPage();

const sideBar = document.querySelector(".sidebar-container");
const body = document.body;

function changeSidebar(){
    if (sideBar.classList.contains('short-sidebar')) {
        sideBar.classList.remove("short-sidebar");
        sideBar.classList.add('sidebar');
        body.classList.remove('short-sidebar-active');
      } else {
        sideBar.classList.add("short-sidebar");
        sideBar.classList.remove('sidebar');
        body.classList.add('short-sidebar-active');
      }
}





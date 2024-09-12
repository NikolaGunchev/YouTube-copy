import { users } from "./userData.js";
import { getVideo } from "../data/videos.js";
import { getChannel } from "../data/channels.js";
import { changeHeader } from "./utils/changeHeader.js";
import { searchBar } from "./utils/searchBar.js";
import { loadSubscribers } from "./utils/loadSubscribers.js";
import { changeSidebar } from "./utils/changeSidebar.js";
import { videoLikes } from "./utils/videoLikes.js";
console.log(users.userData);

function renderPage() {
  let activeProfile = JSON.parse(localStorage.getItem("active"));
  let likes = JSON.parse(localStorage.getItem("likes"))
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
          <div class='video-options-box'>
            <img src="pictures/icons/youtube-vertical-dots.svg" class="video-settings">
              <div class="settings-popup" data-video-id='${matchingVideo.id}'>
                <div class="popup-setting watch-later-option">
                  <p class='js-popup-watchLater-text'>Remove video from liked videos</p>
                </div>
              </div>
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

  //hide and show popup
  let popup=document.querySelectorAll('.settings-popup')
  document.querySelectorAll('.video-settings').forEach((setting,i)=>{
    setting.addEventListener('click',()=>{
      if (popup[i].style.display === "none" || popup[i].style.display === "") {
        popup[i].style.display = "block";
      } else {
        popup[i].style.display = "none";
      }

      document.addEventListener("click", function (event) {
        if (!popup[i].contains(event.target) && event.target !== setting) {
          popup[i].style.display = "none";
        }
      });
    })
  })

  //remove video from liked
  popup.forEach(but=>{
    but.addEventListener('click',()=>{ 
      const videoId = but.dataset.videoId;
      users.addToLikedVideos(activeProfile,videoId)
      videoLikes(likes,videoId,activeProfile)
      renderPage()
    })
  })
}
renderPage();

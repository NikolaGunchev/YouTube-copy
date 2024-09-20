import { videos, getVideo } from "../data/videos.js";
import { shuffleArray } from "./utils/shuffle.js";
import { getChannel } from "../data/channels.js";
import { users } from "./userData.js";
import { changeHeader } from "./utils/changeHeader.js";
import { loadSubscribers } from "./utils/loadSubscribers.js";
import { searchBar } from "./utils/searchBar.js";
import { videoLikes, videoDislikes } from "./utils/videoLikes.js";

let likes = JSON.parse(localStorage.getItem("likes")) || [];
console.log(users.userData);
console.log(likes);

function renderPage() {
  let activeProfile = JSON.parse(localStorage.getItem("active"));
  const url = new URL(window.location.href);
  const videoId = url.searchParams.get("videoId");

  const matchingVideo = getVideo(videoId);
  const matchingChannel = getChannel(matchingVideo.channel);
  let totalLikes = 0;
  if (likes.length) {
    likes.forEach((video) => {
      if (video.id === matchingVideo.id) {
        totalLikes = video.liked.length;
      }
    });
  } else totalLikes = 0;

  let videoHtml = "";
  let likesHtml = "";

  videoHtml = `
    <div class="video">
      
    </div>
    <p class="video-title">
      ${matchingVideo.title}
    </p>
    <div class="video-options">
      <div class="left-half">
        <img src=${matchingChannel.profilePic} />
        <div class="channel">
          <p class="channel-name">${matchingChannel.name}</p>
          <p class="channel-subs">${matchingChannel.subscribers} subscribers</p>
        </div>
        <button class='js-subscribe'>Subscribe</button>
      </div>
      <div class="right-half">
        <button class="like js-like">
        </button>
        <button class="dislike js-dislike">
          <img src="./pictures/icons/youtube-dislike.svg" />
        </button>
        <button class="other-buttons share-button">
          <div><img src="./pictures/icons/youtube-share.svg" /></div>
          <div><p>Share</p></div>
        </button>
        <button class="other-buttons download-button">
          <div><img src="./pictures/icons/youtube-download.svg" /></div>
          <div><p>Download</p></div>
        </button>
        <button class="other-buttons save-button">
          <div><img src="./pictures/icons/youtube-save.svg" /></div>
          <div><p>Save</p></div>
        </button>
        <button class="other-buttons">
          <img src="./pictures/icons/youtube-dots.svg" />
        </button>
      </div>
    </div>
    <div class="description-container">
      <p class="head">${matchingVideo.views} views ${matchingVideo.date} ago</p>
      <p class="description">test test 
  test
  testttttttttttttttttttttttttttttt
  testtttttttasfasasf
  testttttttttt
  test
  testttttttttt
  asdasf
  sup my drilla
            </p>
          </div>
    `;

  let sideHtml = "";
  let videosCopy = videos;
  shuffleArray(videosCopy);

  videosCopy.forEach((video) => {
    if (video.id != matchingVideo.id) {
      sideHtml += `
        <div class="side-video">
        <a href="watch.html?videoId=${video.id}">
        <img src=${video.thumbnail} />
        </a>
          <div class="side-video-content">
            <div class="side-video-title">
            <a href="watch.html?videoId=${video.id}">
            <p>${video.title}</p>
            </a>
            <div class='video-options-box'>
            <img src="pictures/icons/youtube-vertical-dots.svg" class="video-settings">
              <div class="settings-popup" data-video-id='${matchingVideo.id}'>
                <div class="popup-setting watch-later-option">
                  <p class='js-popup-watchLater-text'>Remove video from liked videos</p>
                </div>
              </div>
            </div>
            </div>
            <div class="side-video-info">
              <p>${video.channel}</p>
              <p>${video.views} views &#183; ${video.date} ago</p>
            </div>
          </div>
        </div>
    `;
    }
  });

  function loadLikes() {
    if (likes.length) {
      likes.forEach((video) => {
        if (video.id === matchingVideo.id) {
          totalLikes = video.liked.length;
        }
      });
    } else totalLikes = 0;

    likesHtml = `
    <div><img src="./pictures/icons/youtube-like.svg" /></div>
    <div><p>${totalLikes}</p></div>
    `;

    document.querySelector(".js-like").innerHTML = likesHtml;
  }

  document.title = matchingVideo.title;
  document.querySelector(".js-content-container").innerHTML = videoHtml;
  document.querySelector(".js-videos-row").innerHTML = sideHtml;
  loadLikes()

  users.addToHistory(activeProfile, matchingVideo.id);

  document.querySelector(".js-like").addEventListener("click", () => {
    users.addToLikedVideos(activeProfile, matchingVideo.id);
    videoLikes(likes,matchingVideo.id,activeProfile);
    loadLikes()
  });

  document.querySelector('.js-dislike').addEventListener('click',()=>{
    users.dislikeVideo(activeProfile,matchingVideo.id)
    videoDislikes(likes,matchingVideo.id,activeProfile);
    loadLikes()
  })

  let subscribeBut = document.querySelector(".js-subscribe");
  subscribeBut.addEventListener("click", () => {
    users.addToSubscribers(activeProfile, matchingChannel.name);
    renderPage();
  });

  users.changeSubButton(activeProfile, subscribeBut, matchingChannel);

  document.querySelector(".js-sub-container").innerHTML = loadSubscribers(
    users,
    getChannel,
    activeProfile
  );

  searchBar();

  changeHeader(activeProfile, renderPage);

  const body = document.body;
  const overlay = document.querySelector(".overlay");
  const sidebar = document.querySelector(".sidebar-pop");

  //show sidebar
  document.querySelector(".hamburger-menu").addEventListener("click", () => {
    overlay.style.display = "block";
    sidebar.style.display = "block";
    body.classList.add("no-scroll");
  });
  //hide sidebar
  document.querySelector(".close-sidebar").addEventListener("click", () => {
    overlay.style.display = "none";
    sidebar.style.display = "none";
    body.classList.remove("no-scroll");
  });

  //open and close description
  document
    .querySelector(".description-container")
    .addEventListener("click", function () {
      const description = document.querySelector(".description");
      if (description.classList.contains("expanded")) {
        description.classList.remove("expanded");
      } else {
        description.classList.add("expanded");
      }
    });

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
}
renderPage();

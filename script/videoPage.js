import { videos, getVideo } from "../data/videos.js";
import { shuffleArray } from "./utils/shuffle.js";
import { getChannel } from "../data/channels.js";
import { users } from "./userData.js";
import { changeHeader } from "./utils/changeHeader.js";
import { loadSubscribers } from "./utils/loadSubscribers.js";

import { searchBar } from "./utils/searchBar.js";

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
        totalLikes = video.users.length;
        console.log(totalLikes);
      }
    });
  } else totalLikes = 0;
  console.log(totalLikes);

  let videoHtml = "";

  videoHtml = `
    <div class="video">
            <img src="${matchingVideo.thumbnail}" />
          </div>
          <p class="video-title">
            ${matchingVideo.title}
          </p>
          <div class="video-options">
            <div class="left-half">
              <img src=${matchingChannel.profilePic} />
              <div class="channel">
                <p class="channel-name">${matchingChannel.name}</p>
                <p class="channel-subs">${matchingChannel.subsribers} subscribers</p>
              </div>
              <button class='js-subscribe'>Subscribe</button>
            </div>
            <div class="right-half">
              <button class="like js-like">
                <div><img src="./pictures/icons/youtube-like.svg" /></div>
                <div><p>${totalLikes}</p></div>
              </button>
              <button class="dislike">
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
              <img src="./pictures/icons/youtube-vertical-dots.svg" />
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

  document.title = matchingVideo.title;
  document.querySelector(".js-content-container").innerHTML = videoHtml;
  document.querySelector(".js-videos-row").innerHTML = sideHtml;

  users.addToHistory(activeProfile, matchingVideo.id);

  document.querySelector(".js-like").addEventListener("click", () => {
    users.addToLikedVideos(activeProfile, matchingVideo.id);
    videoLikes();
    renderPage();
  });

  function videoLikes() {
    let have = false;
    let noSuchUser = true;
    if (likes.length) {
      likes.forEach((video) => {
        if (video.id === matchingVideo.id) {
          have = true;
          video.users.forEach((user, i) => {
            if (user === activeProfile) {
              console.log("splice here");
              console.log(video);
              video.users.splice(i, 1);
              localStorage.setItem("likes", JSON.stringify(likes));
              noSuchUser = false;
              return;
            }
          });
          if (noSuchUser) {
            console.log("add profile to existing video");
            console.log(video);
            video.users.push(activeProfile);
            localStorage.setItem("likes", JSON.stringify(likes));
            noSuchUser = true;
            return;
          }
        }
      });
      if (!have) {
        console.log("add video in array with current profile");
        likes.push({
          id: matchingVideo.id,
          users: [activeProfile],
        });
        localStorage.setItem("likes", JSON.stringify(likes));
      }
    } else {
      console.log("add video to start array");

      likes.push({
        id: matchingVideo.id,
        users: [activeProfile],
      });
      localStorage.setItem("likes", JSON.stringify(likes));
    }
  }

  // function getVideoLikes(id){
  //   let matchingVideoLike
  //   likes.forEach(video =>{
  //     if (video.id===id) {
  //       matchingVideoLike=video
  //     }
  //   })
  //   return matchingVideoLike
  // }

  let subscribeBut = document.querySelector(".js-subscribe");
  subscribeBut.addEventListener("click", () => {
    users.addToSubscribers(activeProfile, matchingChannel.name);
    renderPage();
  });

  users.changeSubButton(activeProfile, subscribeBut, matchingChannel);

  document.querySelector(".js-sub-container").innerHTML = loadSubscribers(users,getChannel,activeProfile);

  searchBar();

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

  changeHeader(activeProfile, renderPage);
}
renderPage();

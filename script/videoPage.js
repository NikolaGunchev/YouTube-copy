import { videos, getVideo } from "../data/videos.js";
import { shuffleArray } from "./utils/shuffle.js";

function renderPage() {
  const url=new URL(window.location.href)
  const videoId=url.searchParams.get('videoId')

  let matchingVideo=getVideo(videoId);
  let videoHtml='';

  videoHtml=`
  <div class="video">
          <img src="${matchingVideo.thumbnail}" />
        </div>
        <p class="video-title">
          ${matchingVideo.title}
        </p>
        <div class="video-options">
          <div class="left-half">
            <img src=${matchingVideo.profilePic} />
            <div class="channel">
              <p class="channel-name">${matchingVideo.channel}</p>
              <p class="channel-subs">${matchingVideo.subs} subscribers</p>
            </div>
            <button>Subscribe</button>
          </div>
          <div class="right-half">
            <button class="like">
              <div><img src="./pictures/icons/youtube-like.svg" /></div>
              <div><p>0</p></div>
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
  `

  let sideHtml=''
  let videosCopy=videos
  shuffleArray(videosCopy)

  videosCopy.forEach(video => {
    if (video.id!=matchingVideo.id) {
      console.log('yes');
      sideHtml+=`
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
    `
    }
  });

  document.title = matchingVideo.title;
  document.querySelector('.js-content-container').innerHTML=videoHtml
  document.querySelector('.js-videos-row').innerHTML=sideHtml;

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
}
renderPage();

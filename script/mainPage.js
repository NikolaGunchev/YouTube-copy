import { getVideo, videos } from "../data/videos.js";
import { shuffleArray } from "./utils/shuffle.js";
import { getChannel } from "../data/channels.js";
import { users } from "./userData.js";

console.log(users.userData);
let activeProfile = JSON.parse(localStorage.getItem("active"));

function renderPage() {
  let html = "";
  let videosCopy = videos;
  shuffleArray(videosCopy);

  videosCopy.forEach((video) => {
    let matchingVideo = getVideo(video.id);
    let matchingChannel=getChannel(matchingVideo.channel)
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
 
  changeHeader();

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


function changeSidebar() {
  const sideBarContainer = document.querySelector(".sidebar-container");
  const body = document.body;
  if (sideBarContainer.classList.contains("short-sidebar-active")) {
    sideBarContainer.classList.remove('short-sidebar-active')
    body.classList.remove("short-sidebar-active");
  } else {
    sideBarContainer.classList.add('short-sidebar-active')
    body.classList.add("short-sidebar-active");
  }
}

function changeHeader() {
  let profile = document.querySelector(".profile");
  let profileSign = document.querySelector(".profile-sign");
  if (activeProfile === "notLogged") {
    profile.style.display = "none";
    profileSign.style.display = "block";
  } else {
    profile.style.display = "block";
    profileSign.style.display = "none";
  }
}

document.querySelector(".current-profile-pic").addEventListener("click", () => {
  let popup = document.querySelector(".name-popup");
  let name;
  let hashName;

  if (popup.style.display === "block") {
    popup.style.display = "none";
  } else {
    popup.style.display = "block";
    name = document.querySelector(".js-name-popup");
    hashName = document.querySelector(".js-hash-name-popup");
    name.innerHTML = activeProfile;
    hashName.innerHTML = `@${activeProfile.replace(/\s+/g, "").toLowerCase()}`;
  }
});

document.querySelector(".js-sign-out").addEventListener("click", () => {
  activeProfile = "notLogged";
  localStorage.setItem("active", JSON.stringify(activeProfile));
  renderPage();
});
renderPage();

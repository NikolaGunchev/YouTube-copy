import { users } from "./userData.js";
import { getVideo } from "../data/videos.js";
import { getChannel } from "../data/channels.js";
let activeProfile = JSON.parse(localStorage.getItem("active"));

function renderPage() {
  let html = "";
  console.log(users.userData);
  
  users.userData.forEach(user => {
    if (user.name===activeProfile) {
      user.history.forEach(video =>{
        let matchingVideo=getVideo(video)
        
        html += `
        <div class="video">
          <div class="video-box">
            <img src=${matchingVideo.thumbnail}>
            <div class="video-time">${matchingVideo.videoTime}</div>
          </div>
          <div class="text">
            <div class="video-title">
              <div>
                <p>${matchingVideo.title}</p>
              </div>
              <div class="title-img">
                <div class="cross-container js-cross" data-video-id='${matchingVideo.id}'>
                  <img src="pictures/icons/cross.svg" class="cross-button">
                  <div class="remove-text">Remove from watch history</div>
                </div>
                
                <img src="pictures/icons/youtube-vertical-dots.svg" class="dots-button">
              </div>
            </div>
            <div class="under-title">
              <p>${matchingVideo.channel} &middot; ${matchingVideo.views}</p>
              <p class="description">Description of the video</p>
            </div>
          </div>
        </div>
        `;
      })
    }
  });


document.querySelector('.js-video-list').innerHTML=html

document.querySelectorAll('.js-cross').forEach(cross =>{
  cross.addEventListener('click',()=>{
    const videoId=cross.dataset.videoId
    users.removeFromHistory(videoId,activeProfile)
    renderPage()
  })
})
}

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
renderPage();



import { users } from "./userData.js";
import { getVideo } from "../data/videos.js";
let activeProfile = JSON.parse(localStorage.getItem("active"));
console.log(users.userData);


function renderPage(){
  let bigHtml=''
  let smallHtml=''

  users.userData.forEach((user) => {
    if (user.name===activeProfile) {
      user.likedVideos.forEach((video,i)=>{
        let matchingVideo=getVideo(video)
        if(i===0){
          let matchingVideoBig=getVideo(video)
          bigHtml=`
          <div class="content">
            <div class="image-box">
              <img src=${matchingVideoBig.thumbnail}>
            </div>
            <h1>Liked videos</h1>
            <p class="text1">${activeProfile}</p>
            <p class="text2">${user.likedVideos.length} videos</p>
         </div>
          `
          let firstVideoBox = document.querySelector('.first-video-box');
          firstVideoBox.style.setProperty
          ('--background-url', `url(../${matchingVideoBig.thumbnail})`);
        }

        smallHtml+=`
     <div class="video">
        <div class="video-number">${i+1}</div>
        <div class="image-box-video">
          <img src=${matchingVideo.thumbnail}>
          <div class="video-time">${matchingVideo.videoTime}</div>
        </div>
        <div class="video-content">
          <div class="video-text">
            <p class="text3">${matchingVideo.title}</p>
            <p class="text4">${matchingVideo.channel} &middot; ${matchingVideo.views} views &middot; ${matchingVideo.date} ago</p>
          </div>
          <div class="video-options">
            <img src="pictures/icons/youtube-vertical-dots.svg">
          </div>
        </div>
      </div>
        `

      })
    }
  });

  document.querySelector('.js-first-video-box').innerHTML=bigHtml
  document.querySelector('.js-video-list').innerHTML=smallHtml

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
  
  document.querySelector(".hamburger-menu").addEventListener("click", () => {
    changeSidebar();
  });
}
renderPage()

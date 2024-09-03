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
  let activeProfile = JSON.parse(localStorage.getItem("active"));
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
                  <img src="pictures/icons/youtube-vertical-dots.svg" class="video-settings">
                  <div class="settings-popup">
                    <div class="popup-setting watch-later-option" data-video-id='${matchingVideo.id}'>
                      <img src="pictures/icons/watch-later.svg">
                      Add video to watch later list
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
  let popup=document.querySelectorAll('.settings-popup')
  let settingsBox=document.querySelectorAll('.video-settings')
  settingsBox.forEach((but,i)=>{
    but.addEventListener('click',()=>{
      if (popup[i].style.display === 'none' || popup[i].style.display === '') {
        popup[i].style.display='block'
      } else{
        popup[i].style.display='none'
      }
    })
    //Hide video settings when clicking anywhere on the screen
    document.addEventListener('click', function(event) {
      // Check if the click is outside the popup
      if (!popup[i].contains(event.target) && event.target !== but) {
          popup[i].style.display = 'none';
      }
    });
  })

  //not working. maybe cuz of past profiles
document.querySelectorAll('.watch-later-option').forEach(option=>{
option.addEventListener('click',()=>{
  const videoId=option.dataset.videoid;
  users.userData.forEach(user=>{
    if (user.name===activeProfile) {
      user.watchLater.forEach(video=>{
        if (video===videoId) {
          users.watchLaterButton(activeProfile,videoId)
          option.innerHTML='Remove video from watch later list'
        } else {
          users.watchLaterButton(activeProfile,videoId)
          option.innerHTML='Add video from watch later list'
        }
      })
    }
  })
})
})
}
renderPage();

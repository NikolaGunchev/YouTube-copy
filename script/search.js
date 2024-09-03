import { getVideo, videos } from "../data/videos.js";
import { getChannel } from "../data/channels.js";
import { users } from "./userData.js";
import { loadSubscribers } from "./utils/loadSubscribers.js";
import { changeHeader } from "./utils/changeHeader.js";
import { changeSidebar} from "./utils/changeSidebar.js";
import { searchBar } from "./utils/searchBar.js";

function renderPage() {
  let activeProfile = JSON.parse(localStorage.getItem("active"));
  const url = new URL(window.location.href);
  let searchResult = url.searchParams.get("search_query");

  let html = "";
  let channelHtml=''
  videos.forEach(video=>{
    let matchingVideo = getVideo(video.id);
    let matchingChannel = getChannel(matchingVideo.channel);
    let currentVideoChannel=video.channel.replace(/\s/g, '');
    let currentVideoTitle=video.title.replace(/\s/g, '');
    searchResult=searchResult.replace(/\s/g, '');

    //the search works in a very basic way so you need to be very specific if u want to find something, because the videos dont have things like tags or keywords or any kind of algorithm that can find them
    if (currentVideoChannel.toLowerCase().includes(searchResult.toLocaleLowerCase())) {
      channelHtml+=`
      <div class="channel-result">
      
        <div class="image-box">
          <img src=${matchingChannel.profilePic}>
        </div>
        <div class="channel-text">
          <p class="channel-name">${matchingChannel.name}</p>
          <p class="channel-info">@${matchingChannel.name} &#183 ${matchingChannel.subscribers} subscribers</p>
        </div>
        <div class="subscribe-container">
          <button class="sub-button js-subscribe">Subscribe</button>
        </div>
      </div>
      `
      document.querySelector('.js-channel-box').innerHTML=channelHtml
      subscribeBut(matchingChannel)
    }
    if (currentVideoTitle.toLowerCase().includes(searchResult.toLocaleLowerCase()) 
      || currentVideoChannel.toLowerCase().includes(searchResult.toLocaleLowerCase())) {
        html+=`
        <div class='video'>
            <div class="image-box">
              <a href='watch.html?videoId=${video.id}' class=video-link>
                <img src=${matchingVideo.thumbnail}>
              </a>
            </div>
            <div class="video-info">
              <a href='watch.html?videoId=${video.id}' class=video-link>
                <div class="title">
                  <p>${matchingVideo.title}</p>
                  
                </div>
                <p class="video-data">${matchingVideo.views} views &#183 ${matchingVideo.date} ago</p>
                <div class="video-channel">
                  <div class="image-boxa">
                    <img src=${matchingChannel.profilePic}>
                  </div>
                  <p>${matchingChannel.name}</p>
                </div>
                <p class="description">
                  If the videos had description it would go here :/
                </p>
              </a>
            </div>
            <img src="pictures/icons/youtube-vertical-dots.svg" class='dots'>
          </div>
        `
    }

  })
  
  document.querySelector('.js-videos-list').innerHTML=html


  document.querySelector(".js-sub-container").innerHTML = 
  loadSubscribers(users,getChannel,activeProfile);

  document.querySelector(".hamburger-menu").addEventListener("click", () => {
    changeSidebar();
  });

  changeHeader(activeProfile, renderPage);

  searchBar();

  function subscribeBut(matchingChannel){
    let subscribeBut = document.querySelector(".js-subscribe");

    subscribeBut.addEventListener("click", () => {
      users.addToSubscribers(activeProfile, matchingChannel.name);
      renderPage();
    });
  
    users.changeSubButton(activeProfile, subscribeBut, matchingChannel);
  }

}
renderPage();

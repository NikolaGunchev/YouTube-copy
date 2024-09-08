export function videoDislikes(likes, matchingVideo, activeProfile) {
  let have = false;
  let noSuchUser = true;
  if (likes.length) {
    likes.forEach((video) => {
      if (video.id === matchingVideo) {
        //check if user has liked the video before doing all the dislike code
        if (video.liked.length) {
          video.liked.forEach((user, i) => {
            if (user === activeProfile) {
              video.liked.splice(i, 1);
              localStorage.setItem("likes", JSON.stringify(likes));
            }
          });
        }     

        //checking if the user has already disliked the video and remove it from the disliked,
        //if not add the user to the disliked array
        have = true;
        video.disliked.forEach((user, i) => {
          if (user === activeProfile) {
            video.disliked.splice(i, 1);
            localStorage.setItem("likes", JSON.stringify(likes));
            noSuchUser = false;
            return;
          }
        });
        if (noSuchUser) {
          video.disliked.push(activeProfile);
          localStorage.setItem("likes", JSON.stringify(likes));
          noSuchUser = true;
          return;
        }
      }
    });
    //checking if the video is in the array of the local storage element 'likes'
    if (!have) {
      likes.push({
        id: matchingVideo,
        liked: [],
        disliked: [activeProfile],
      });
      localStorage.setItem("likes", JSON.stringify(likes));
    }
  } else {
    //when using the buttons for the first time always add the video with the current user in the array
    likes.push({
      id: matchingVideo,
      liked: [],
      disliked: [activeProfile],
    });
    localStorage.setItem("likes", JSON.stringify(likes));
  }
}

export function videoLikes(likes, matchingVideo, activeProfile) {
  let have = false;
  let noSuchUser = true;
  if (likes.length) {
    likes.forEach((video) => {
      if (video.id === matchingVideo) {
        //check if user has disliked the video before doing all the dislike code
        if (video.disliked.length) {
          video.disliked.forEach((user, i) => {
            if (user === activeProfile) {
              video.disliked.splice(i, 1);
              localStorage.setItem("likes", JSON.stringify(likes));
            }
          });
        }  

        //checking if the user has already liked the video and remove it from the liked,
        //if not add the user to the liked array
        have = true;
        video.liked.forEach((user, i) => {
          if (user === activeProfile) {
            video.liked.splice(i, 1);
            localStorage.setItem("likes", JSON.stringify(likes));
            noSuchUser = false;
            return;
          }
        });
        if (noSuchUser) {
          video.liked.push(activeProfile);
          localStorage.setItem("likes", JSON.stringify(likes));
          noSuchUser = true;
          return;
        }
      }
    });
    //checking if the video is in the array of the local storage element 'likes'
    if (!have) {
      likes.push({
        id: matchingVideo,
        liked: [activeProfile],
        disliked: [],
      });
      localStorage.setItem("likes", JSON.stringify(likes));
    }
  } else {
    //when using the buttons for the first time always add the video with the current user in the array
    likes.push({
      id: matchingVideo,
      liked: [activeProfile],
      disliked: [],
    });
    localStorage.setItem("likes", JSON.stringify(likes));
  }
}
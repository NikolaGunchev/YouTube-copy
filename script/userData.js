class User {
  userData;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadUserDataFromStorage();
  }

  loadUserDataFromStorage() {
    this.userData =
      JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  }

  getUserDataFromStorage() {
    return (this.userData =
      JSON.parse(localStorage.getItem(this.localStorageKey)) || []);
  }

  saveUserDataToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.userData));
  }

  addNewProfile(profile, password) {
    this.userData.push({
      name: profile,
      password: password,
      likedVideos: [],
      history: [],
      watchLater:[],
      subscribers: [],
    });
    this.saveUserDataToStorage();
  }

  addToHistory(name, id) {
    let have = false;
    this.userData.forEach((user) => {
      if (user.name === name) {
        user.history.forEach((videoId, i) => {
          if (videoId === id) {
            user.history.splice(i, 1);
            user.history.unshift(id);
            have = true;
          }
        });
        if (!have) {
          user.history.unshift(id);
        }
      }
    });
    this.saveUserDataToStorage();
  }

  removeFromHistory(video,activeProfile){
    const newArray=[]
    this.userData.forEach(user=>{
      if (user.name===activeProfile) {
        user.history.forEach(vid=>{
          if (video===vid) {
            return
          } else{
            newArray.push(vid)
          }
        })
      }
    })
    this.userData.forEach(user=>{
      if (user.name===activeProfile) {
        user.history=newArray
      }
    })
    this.saveUserDataToStorage()
  }

  addToLikedVideos(name, id) {
    let have = false;
    this.userData.forEach((user) => {
      if (user.name === name) {
        user.likedVideos.forEach((videoId, i) => {
          if (videoId === id) {
            user.likedVideos.splice(i, 1);
            have = true;
          }
        });
        if (!have) {
          user.likedVideos.unshift(id);
        }
      }
    });
    this.saveUserDataToStorage();
  }

  watchLaterButton(name,id){
    let have = false;
    this.userData.forEach((user) => {
      if (user.name === name) {
        user.watchLater.forEach((videoId, i) => {
          if (videoId === id) {
            user.watchLater.splice(i, 1);
            have = true;
          }
        });
        if (!have) {
          user.watchLater.unshift(id);
        }
      }
    });
    this.saveUserDataToStorage();
  }

  addToSubscribers(name, matchingChannel) {
    let have = false;
    this.userData.forEach((user) => {
      if (user.name === name) {
        user.subscribers.forEach((channel, i) => {
          if (channel === matchingChannel) {
            user.subscribers.splice(i, 1);
            have = true;
          }
        });
        if (!have) {
          user.subscribers.unshift(matchingChannel);
        }
      }
    });
    this.saveUserDataToStorage();
  }

  changeSubButton(activeProfile, subscribeBut, matchingChannel) {
    let have = false;
    this.userData.forEach((user) => {
      if (user.name === activeProfile) {
        user.subscribers.forEach((channel) => {
          if (channel === matchingChannel.name) {
            subscribeBut.innerHTML = "Subscribed";
            subscribeBut.style.backgroundColor='white';
            subscribeBut.style.color='black';
            subscribeBut.style.border='1px solid black'
            have = true;
          }
        });
        if (!have) {
          subscribeBut.innerHTML = "Subscribe";
          subscribeBut.style.backgroundColor='black';
            subscribeBut.style.color='white';
            subscribeBut.style.border='none'
        }
      }
    });
  }

  /*
  dislikeVideo(name, id) {
    this.userData.forEach((user) => {
      let array = user.likedVideos;
      if (user.name === name) {
        array.forEach((video, i) => {
          if (video === id) {
            array.splice(i, 1);
          }
        });
      }
    });
    this.saveUserDataToStorage();
  }
    */
}

export let users = new User("userData");

class User {
  userData;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadUserDataFromStorage();
  }

  loadUserDataFromStorage() {
    this.userData = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  }

  getUserDataFromStorage(){
    return this.userData = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
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
      subscribers: [],
    });
    this.saveUserDataToStorage();
  }

  addToHistory(name, id) {
    this.userData.forEach((user) => {
      if (user.name === name) {
        user.history.unshift(id);
      }
    });
    this.saveUserDataToStorage();
  }

  addToLikedVideos(name, id) {
    this.userData.forEach((user) => {
      if (user.name === name) {
        user.likedVideos.unshift(id);
      }
    });
    this.saveUserDataToStorage();
  }

  removeFromLikedVideos(name, id) {
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

  addToSubscribers(name, id) {
    this.userData.forEach((user) => {
      if (user.name === name) {
        user.subscribers.unshift(id);
      }
    });
    this.saveUserDataToStorage();
  }
}

export let users=new User('userData')
class User{
  name;
  password;
  localStorageKey;
  users;

  constructor(name, password, localStorageKey){
      this.name=name
      this.password=password
      this.localStorageKey=localStorageKey
  }

  likedVideos(){
    return []
  }

  history(){
    return []
  }

  subbedChannels(){
    return []
  }

}


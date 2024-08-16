import { users } from "./userData.js";

document.querySelector(".sign-up").addEventListener("click", () => {
  getData();
});

function getData() {
  let activeProfile=JSON.parse(localStorage.getItem('active')) || 'notLogged'
  let userName = document.querySelector(".username").value;
  let password = document.querySelector(".password").value;
  let passwordCheck = document.querySelector(".password-check").value;
  let profiles = users.getUserDataFromStorage();

  profiles.forEach((user) => {
    if (user.name === userName) {
      alert("there already exist user with that name.");
      return;
    }
  });

  if (passwordCheck === password) {
    let profile = {
      name: userName,
      password: password,
    };

    users.addNewProfile(profile.name,profile.password)
    activeProfile=profile.name
    localStorage.setItem('active', JSON.stringify(activeProfile))

    document.querySelector(".username").value = "";
    document.querySelector(".password").value = "";
    document.querySelector(".password-check").value = "";
    window.location.href = "youtube.html";
  } else {
    alert("wrong password");
  }
}

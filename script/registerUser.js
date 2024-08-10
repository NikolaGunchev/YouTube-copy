import { users } from "./userData.js";

document.querySelector(".sign-up").addEventListener("click", () => {
  getData();
});

function getData() {
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

    document.querySelector(".username").value = "";
    document.querySelector(".password").value = "";
    document.querySelector(".password-check").value = "";
    window.location.href = "youtube.html";
  } else {
    alert("wrong password");
  }
}

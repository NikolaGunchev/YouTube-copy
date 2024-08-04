function loadUsersFromStorage() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUserInStorage(profile) {
  localStorage.setItem("users", JSON.stringify(profile));
}

document.querySelector(".sign-up").addEventListener("click", () => {
  getData();
});

function getData() {
  let userName = document.querySelector(".username").value;
  let password = document.querySelector(".password").value;
  let passwordCheck = document.querySelector(".password-check").value;
  let profiles=loadUsersFromStorage()

    profiles.forEach(user => {
        if (user.name===userName) {
            alert("there already exist user with that name.")
            return
        }
    });

  if (passwordCheck === password) {
    let profile = {
      name: userName,
      password: password,
    };
    profiles.push(profile)

    saveUserInStorage(profiles);
    document.querySelector(".username").value = "";
    document.querySelector(".password").value = "";
    document.querySelector(".password-check").value = "";
    windows.location.href='youtube.html'
  } else {
    alert("wrong password");
  }

  
}

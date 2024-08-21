export function changeHeader(activeProfile, func) {
  function changeHeaderStyle() {
    let profile = document.querySelector(".profile");
    let profileSign = document.querySelector(".profile-sign");
    if (activeProfile === "notLogged") {
      profile.style.display = "none";
      profileSign.style.display = "block";
    } else {
      profile.style.display = "block";
      profileSign.style.display = "none";
    }
  }
  changeHeaderStyle();

  document
    .querySelector(".current-profile-pic")
    .addEventListener("click", () => {
      let popup = document.querySelector(".name-popup");
      let name;
      let hashName;

      if (popup.style.display === "block") {
        popup.style.display = "none";
      } else {
        popup.style.display = "block";
        name = document.querySelector(".js-name-popup");
        hashName = document.querySelector(".js-hash-name-popup");
        name.innerHTML = activeProfile;
        hashName.innerHTML = `@${activeProfile
          .replace(/\s+/g, "")
          .toLowerCase()}`;
      }
    });

  document.querySelector(".js-sign-out").addEventListener("click", () => {
    activeProfile = "notLogged";
    localStorage.setItem("active", JSON.stringify(activeProfile));
    func();
    changeHeaderStyle();
  });
}

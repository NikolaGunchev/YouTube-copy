function changeSidebar() {
  const sideBarContainer = document.querySelector(".sidebar-container");
  const body = document.body;
  if (sideBarContainer.classList.contains("short-sidebar-active")) {
    sideBarContainer.classList.remove('short-sidebar-active')
    body.classList.remove("short-sidebar-active");
  } else {
    sideBarContainer.classList.add('short-sidebar-active')
    body.classList.add("short-sidebar-active");
  }
}

document.querySelector(".hamburger-menu").addEventListener("click", () => {
  changeSidebar();
});
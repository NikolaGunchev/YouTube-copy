export function searchBar() {
  let searchButton = document.querySelector(".js-search-button");
  let searchInput = document.querySelector(".js-searchBox");

  searchButton.addEventListener("click", () => {
    let searchValue = document.querySelector(".js-searchBox").value;
    window.location.href = `search.html?search_query=${searchValue}`;
  });

  searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      let searchValue = document.querySelector(".js-searchBox").value;
      window.location.href = `search.html?search_query=${searchValue}`;
    }
  });
}

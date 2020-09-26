// Script to toggle the search button functionality
// Assigning DOM elements
const buttonSearch = document.querySelector("#page-home .content main a");
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .content .header a");
// Open search city functionality
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide");
})
// Close search city functionality
close.addEventListener("click", () => {
    modal.classList.add("hide");
})
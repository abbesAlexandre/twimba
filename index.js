import { tweetsData } from "/data.js";

const modal = document.getElementsByClassName("modal")[0];

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("tweet-menu")) {
    let rect = e.target.getBoundingClientRect();
    modal.classList.toggle("show");
    
    if (window.matchMedia("(min-width: 320px)").matches) {
      modal.style.left = rect.right - 150 + "px";
      modal.style.top = rect.top + "px";
    } 
    if (window.matchMedia("(min-width: 1440px)").matches) {
      modal.style.left = rect.right - 140 + "px"; 
      modal.style.top = rect.top + "px";
    } 
    if(window.matchMedia("(min-width: 1920px)").matches){
      modal.style.left = rect.right - 180 + "px";
      modal.style.top = rect.top + "px";
    }
  } else if (!e.target.parentNode.classList.contains("menu")){
    console.log(e.target);
    modal.classList.remove("show");
  }
});

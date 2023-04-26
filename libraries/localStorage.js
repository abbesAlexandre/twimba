import { tweetsData } from "../data.js";

export function setLocalStorage(tweets) {
  if (window.localStorage.length === 0) {
    localStorage.setItem("tweetsData", JSON.stringify(tweetsData));
  } else {
    localStorage.clear();
    localStorage.setItem("tweetsData", JSON.stringify(tweets));
  }
}

export function getLocalStorageData() {
  let data = JSON.parse(localStorage.getItem("tweetsData"));
  return data;
}

export function initLocalStorage(){
  if (window.localStorage.length === 0) {
    localStorage.setItem("tweetsData", JSON.stringify(tweetsData));
  }
}
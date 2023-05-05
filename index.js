import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { getFeedHtml } from "/libraries/feed.js";
import {
  getTweetObject,
  getTweetRepliesObject,
} from "/libraries/tweetObject.js";
import {
  deleteTweet,
  editTweet,
  replyTweet,
  toggleBtn,
  setLikeReply,
} from "/libraries/tweetFeature.js";
import { renderModal, removeModal } from "/libraries/modals.js";
import {
  getLocalStorageData,
  initLocalStorage,
  setLocalStorage,
} from "./libraries/localStorage.js";

//localStorage.clear();
initLocalStorage();


const myBody = document.body;
const myHtml = document.getElementsByTagName("html")[0];
const tweetBtn = document.getElementById("tweet-btn");
const tweetInput = document.getElementById("tweet-input");
const tweetFeed = document.getElementsByClassName("tweet-feed")[0];
let tweetUuid = "";
let isItReply = false;

document.addEventListener("keyup", function (e) {
  switch (e.target.id) {
    case "tweet-input": // enabling/disabling the tweet button
      toggleBtn(tweetBtn, tweetInput.value != "");
      break;

    case "tweet-reply": // enabling/disabling the reply btn
      toggleBtn(
        document.getElementById("reply-btn"),
        document.getElementById("tweet-reply").value != ""
      );
      break;

    case "message": // enabling/disabling the edit btn
      const editBtn = document.getElementById("edit-btn");
      const message = document.getElementsByClassName("message")[0];
      let targetTweetObj = "";
      let myData = getLocalStorageData();
      if (editBtn.dataset.isReply === "true") {
        targetTweetObj = getTweetRepliesObject(editBtn.dataset.uuid, myData);
      } else {
        targetTweetObj = getTweetObject(editBtn.dataset.uuid, myData);
      }

      toggleBtn(editBtn, message.innerText != targetTweetObj.tweetText);
      break;
  }
});

document.addEventListener("click", function (e) {
  switch (e.target.id) {
    case "edit-btn": // editing a tweet
      editTweet(tweetUuid, isItReply);
      render();
      myBody.classList.remove("smoke-background");
      myHtml.style.overflow = "scroll";
      break;

    case "reply-btn": // adding a reply to a tweet
      replyTweet(
        tweetUuid,
        document.getElementById("tweet-reply").value,
        e.target.dataset.isReply
      );
      render();
      myBody.classList.remove("smoke-background");
      myHtml.style.overflow = "scroll";
      break;

    case "tweet-btn": // adding a new tweet
      if (e.target.disabled === false) {
        const date = new Date();
        let message = tweetInput.value;
        let myDate =
          date.toLocaleString("en-GB", { month: "short" }) +
          " " +
          date.getDate() +
          ", " +
          date.toLocaleString("en-GB", { year: "numeric" });
        let myHour = date
          .toLocaleString("en-GB", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
          .toUpperCase();

        let newTweetObject = {
          handle: "@scrimba",
          username: "Scrimba",
          profilePic: `images/scrimbalogo.png`,
          likes: 0,
          retweets: 0,
          tweetText: message,
          replies: [],
          isReply: false,
          isLiked: false,
          isRetweeted: false,
          uuid: uuidv4(),
          date: myHour + " " + myDate,
        };
        let myData = getLocalStorageData();
        myData.unshift(newTweetObject);
        setLocalStorage(myData);
        render();
        tweetInput.value = "";
        tweetBtn.disabled = true;
        tweetBtn.classList.remove("twitter-background-blue");
      }
      break;

    case "yes": // complete delete tweet modal
      let yesBtn = document.getElementById("yes");
      if (yesBtn.dataset.tweetUuid != "") {
        deleteTweet(yesBtn.dataset.tweetUuid, yesBtn.dataset.isReply);
        render();
      }
      myHtml.style.overflow = "scroll";
      break;

    case "no": // close delete tweet modal
      removeModal("delete-modal");
      break;
  }

  /** opening three dot menu */

  let rect = e.target.getBoundingClientRect();

  if (e.target.classList.contains("tweet-menu")) {
    tweetUuid = e.target.dataset.menu;
    isItReply = e.target.dataset.isReply;
    // render menu modal
    renderModal("modal", tweetUuid, isItReply);

    // targeting modal after render
    const modal = document.getElementsByClassName("modal")[0];

   
    myHtml.style.overflow = "hidden";

    /** setting position depending of the screen width */
    if (window.matchMedia("(min-width: 320px)").matches) {
      modal.style.left = rect.right - 150 + "px";
      modal.style.top = rect.top + "px";
    }
    if (window.matchMedia("(min-width: 1440px)").matches) {
      modal.style.left = rect.right - 140 + "px";
      modal.style.top = rect.top + "px";
    }
    if (window.matchMedia("(min-width: 1920px)").matches) {
      modal.style.left = rect.right - 180 + "px";
      modal.style.top = rect.top + "px";
    }
    /** closing three dot menu if click outside box */
  } else if (document.getElementsByClassName("modal")[0]) {
    if (!e.target.parentNode.classList.contains("menu")) {
      removeModal("modal");
    }
  }

  /** opening reply/edit modal  */

  if (
    e.target.classList.contains("reply") ||
    e.target.classList.contains("edit")
  ) {
    tweetUuid = e.target.dataset.menu;
    isItReply = e.target.dataset.isReply;
    removeModal("modal");
    myBody.classList.toggle("smoke-background");
    myHtml.style.overflow = "hidden";
    if (e.target.classList.contains("edit")) {
      renderModal("edit", tweetUuid, isItReply);
    } else {
      renderModal("reply", tweetUuid, isItReply);
    }
  }

  if (e.target.classList.contains("fa-comment-dots")) {
    tweetUuid = e.target.dataset.comment;
    isItReply = e.target.dataset.isReply;
    renderModal("reply", tweetUuid, isItReply);
  }

  /** Closing reply/edit modal */

  if (e.target.classList.contains("close")) {
    removeModal("edit-modal");
    myBody.classList.remove("smoke-background");
    myHtml.style.overflow = "scroll";
  }

  /** opening delete modal */
  if (e.target.classList.contains("delete")) {
    removeModal("modal");
    renderModal(
      "delete-modal",
      e.target.dataset.menu,
      e.target.dataset.isReply
    );
    const deleteModal = document.getElementsByClassName("delete-modal")[0];
    deleteModal.style.top = rect.top - 50 + "px";
    myHtml.style.overflow = "hidden";
  }

  /* like button */
  if (e.target.classList.contains("fa-heart")) {
    setLikeReply(e.target.dataset.like, e.target.dataset.isReply, "like");
  }
  /* retweet button */
  if (e.target.classList.contains("fa-retweet")) {
    setLikeReply(e.target.dataset.retweet, e.target.dataset.isReply, "retweet");
  }
});

/* rendering data */

export function render() {
  tweetFeed.replaceChildren();
  tweetFeed.innerHTML = getFeedHtml();
}

render();

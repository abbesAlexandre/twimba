import {
  getTweetAndRepliesIndex,
  getTweetObject,
  getTweetRepliesObject,
} from "./tweetObject.js";
import { render } from "../index.js";
import { setLocalStorage, getLocalStorageData } from "./localStorage.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
let myData = [];

export function deleteTweet(tweetUuid, isReplyParam) {
  myData = getLocalStorageData();
  if (isReplyParam === "false") {
    const targetTweetObj = getTweetObject(tweetUuid, myData);
    myData.splice(
      myData.findIndex((a) => a.uuid === targetTweetObj.uuid),
      1
    );
  } else {
    const targetTweetRepliesObj = getTweetRepliesObject(tweetUuid, myData);
    targetTweetRepliesObj.isDeleted = true;
  }
  setLocalStorage(myData);
}

export function editTweet(tweetUuid, isReply) {
  if (isReply === "false") {
    const targetTweetObj = getTweetObject(tweetUuid, myData);
    targetTweetObj.tweetText =
      document.getElementsByClassName("message")[0].innerText;
  } else {
    const targetTweetRepliesObject = getTweetRepliesObject(tweetUuid, myData);
    targetTweetRepliesObject.tweetText =
      document.getElementsByClassName("message")[0].innerText;
  }
  setLocalStorage(myData);
}
export function replyTweet(tweetUuid, tweetMessage, isReply) {
  let targetTweetObj = "";
  let replyingTo = "";
  let indexes = "";
  myData = getLocalStorageData();

  if (isReply === "false") {
    targetTweetObj = getTweetObject(tweetUuid, myData);
    replyingTo = targetTweetObj.handle;
  } else {
    indexes = getTweetAndRepliesIndex(tweetUuid, myData);
    targetTweetObj = myData[indexes[0]];
    replyingTo = myData[indexes[0]].replies[indexes[1]].handle;
  }
  const date = new Date();
  let newRepliesObject = {
    handle: "@scrimba",
    username: "Scrimba",
    profilePic: `images/scrimbalogo.png`,
    tweetText: tweetMessage,
    date: date.toLocaleString("en-GB", { month: "short", day: "2-digit" }),
    replyCase: 3,
    replyTo: replyingTo,
    isReply: true,
    uuid: uuidv4(),
    isDeleted: false,
  };
  if (isReply === "true") {
    targetTweetObj.replies.splice(indexes[1] + 1, 0, newRepliesObject);
  } else {
    targetTweetObj.replies.unshift(newRepliesObject);
  }
  setLocalStorage(myData);
}

export function toggleBtn(btn, expression) {
  if (expression) {
    btn.disabled = false;
    if (btn.classList.contains("twitter-background-blue") === false) {
      btn.classList.toggle("twitter-background-blue");
    }
  } else {
    btn.disabled = true;
    btn.classList.remove("twitter-background-blue");
  }
}

export function setLikeReply(tweetUuid, isReply, iconType) {
  let currentTargetObj = "";
  let isIcon = "";
  let icon = "";
  myData = getLocalStorageData();
  if (iconType === "like") {
    isIcon = "isLiked";
    icon = "likes";
  } else {
    isIcon = "isRetweeted";
    icon = "retweets";
  }

  if (isReply === "false") {
    currentTargetObj = getTweetObject(tweetUuid, myData);
  } else {
    currentTargetObj = getTweetRepliesObject(tweetUuid, myData);
  }

  if (currentTargetObj[isIcon] === true) {
    currentTargetObj[isIcon] = false;
    currentTargetObj[icon]--;
  } else {
    currentTargetObj[isIcon] = true;
    currentTargetObj[icon]++;
  }
  setLocalStorage(myData);
  render();
}

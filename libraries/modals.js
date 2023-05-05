import { getLocalStorageData } from "./localStorage.js";
import { getTweetObject, getTweetRepliesObject } from "./tweetObject.js";

export function renderModal(modal, tweetUuid, isReply) {
  let feedHtml = "";

  switch (modal) {
    case "modal":
      feedHtml += `<div class="modal show">
        <ul class="menu">
          <li class="edit" data-menu=${tweetUuid} data-is-reply=${isReply}>
            Edit Tweet 
            <i class="fa-solid fa-pen-to-square fa-xs"></i>
          </li>
          <li class="delete" data-menu=${tweetUuid} data-is-reply=${isReply}>
            Delete Tweet 
            <i class="fa-solid fa-delete-left fa-xs"></i>
          </li>
          <li class="reply" data-menu=${tweetUuid} data-is-reply=${isReply}>
            Reply Tweet 
            <i class="fa-solid fa-pen-to-square fa-xs"></i>
          </li>
        </ul>
      </div>
      `;
      break;
    case "delete-modal":
      feedHtml += `<div class="delete-modal show">
      <h4>Are you sure you want to delete this tweet ?</h4>
      <div class="answer-container">
        <button id="yes" class="twitter-background-blue" data-tweet-uuid=${tweetUuid} data-is-reply=${isReply}>Yes</button>
        <button id="no" class="twitter-background-blue">No</button>
      </div>
    </div>
    `;
      break;
    default:
      let isReplyToFeed = "";
      let isReplyFeed = "";
      let myTweet = "";
      let myData = getLocalStorageData();

      let contentEditable = true;
      let buttonText = "Reply";
      let buttonId = "reply-btn"

      if (isReply === "true") {
        myTweet = getTweetRepliesObject(tweetUuid, myData);
        isReplyToFeed = `<p class="avatar-account twitter-gray">Replying to <a class="twitter-blue">${getTweetRepliesObject(tweetUuid, myData).replyTo}</a></p>"`
      } else {
        myTweet = getTweetObject(tweetUuid, myData);
      }

      if (modal === "reply") {
        contentEditable = false;
        buttonText = "Reply";
        buttonId = "reply-btn";
        isReplyFeed = `<div class="reply-container">
          <div class="reply-avatar">
            <span class="top-pipe"></span>
            <img alt="avatar" class="profile-pic" src="images/scrimbalogo.png" />
          </div>
          <textarea class="your-reply" id="tweet-reply" placeholder="Tweet your reply" maxlength="75"></textarea>
        </div>
        `
      }else{
        buttonText = "Edit";
        buttonId = "edit-btn";
      }

      feedHtml += `<div class="your-reply-container edit-modal show-flex">
      <span class="fa-solid fa-xmark fa-lg close"></span>
      <div class="tweets-reply-container">
        <div class="avatar-reply-container">
          <span class="space"></span>
          <img alt="avatar" class="profile-pic" src=${myTweet.profilePic} />
          <span class="pipe"></span>
        </div>
        <div class="tweet-title">
          <div class="title-content">
            <p>
              ${myTweet.username} 
              <span class="avatar-account twitter-gray">${myTweet.handle}</span>
              <span class="dot"></span>
              <span class="date">${myTweet.date}</span>
            </p>
          </div>
          <p class="message" id="message" contenteditable=${contentEditable}>${myTweet.tweetText}</p>
          ${isReplyToFeed}
        </div>
        </div>
        ${isReplyFeed}
        <div class="reply-btn-container">
          <button 
            id=${buttonId}
            data-uuid =${tweetUuid}
            data-is-reply=${isReply}
            disabled
          >
          ${buttonText}
          </button>   
        </div>
      </div>
    </div>
    `;
  }

  document.getElementsByClassName("tweet-feed")[0].innerHTML += feedHtml;
}

export function removeModal(modalClass) {
  if (document.getElementsByClassName(modalClass)[0]) {
    document.getElementsByClassName(modalClass)[0].remove();
    document.getElementsByTagName("html")[0].style.overflow = "scroll";
  }
}

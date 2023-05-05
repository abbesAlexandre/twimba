import { getLocalStorageData } from "./localStorage.js";

export function getFeedHtml() {
  let feedHtml = "";
  let myData = getLocalStorageData();
  if (myData != null) {
    for (let tweet of myData) {
      // tweet
      feedHtml += `<div class="tweet-container"> 
        <div class="tweet-header">
          <img class="profile-pic" alt="tweet avatar picture" src=${tweet.profilePic
        } />
          <div class="tweet-title">
            <div class="title-content">
              <p>${tweet.username}</p>
              <i class="fa-solid fa-ellipsis tweet-menu" data-menu=${tweet.uuid
        } data-is-reply=${tweet.isReply}></i>
            </div>
            <p class="avatar-account twitter-gray"><small>${tweet.handle
        }</small></p>  
          </div>  
        </div>
        <p class="tweet-message">${tweet.tweetText}</p>
        <p class="twitter-gray">${setDotBetweenDate(tweet.date)}</p>
        <div class="tweet-count">
          <p>${tweet.retweets} retweets</p>
          <p>${tweet.likes} likes</p>
          <p>${tweet.replies.length} reply</p>
        </div>
        <div class="tweet-footer twitter-gray">
          <i class="fa-regular fa-comment-dots" data-comment=${tweet.uuid
        } data-is-reply=${tweet.isReply}></i>
          <i class="fa-solid fa-heart ${tweet.isLiked === true ? "twitter-red" : ""
        }" data-like=${tweet.uuid} data-is-reply=${tweet.isReply}></i>
          <i class="fa-solid fa-retweet ${tweet.isRetweeted === true ? "twitter-limegreen" : ""
        }" data-retweet=${tweet.uuid} data-is-reply=${tweet.isReply}></i>
          <i class="fa-solid fa-trash-can delete" data-menu=${tweet.uuid
        } data-is-reply=${tweet.isReply}></i>
        </div>
      </div>
    </div>
    </div>
        `;
      feedHtml += getTweetReplies(tweet);
    }
  } else {
    console.log("error localStorage");
  }
  return feedHtml;
}

function setDotBetweenDate(tweetDate) {
  return `${tweetDate.substring(
    0,
    8
  )}<span class="dot"></span> ${tweetDate.substring(8)}`;
}

// return array of object
export function getTweetReplies(tweet) {
  let feedHtml = "";
  if (tweet.replies.length > 0) {
    for (let reply of tweet.replies) {
      if (reply.isDeleted) {
        feedHtml += renderDeletedTweet();
      } else {
        feedHtml += `<div class="tweets-reply-container">
            <div class="avatar-reply-container">
              ${getAvatarReplyContainerContent(reply)}
            </div>
            <div class="tweet-title">
              <div class="title-content">
                <p>${reply.username} 
                  <span class="avatar-account twitter-gray">${reply.handle
          }</span>
                  <span class="dot"></span>
                  <span class="twitter-gray"> ${reply.date}</span>
                </p>
                <p class="twitter-gray">
                  <i class="fa-solid fa-ellipsis tweet-menu" data-menu=${reply.uuid
          } data-is-reply=${reply.isReply}></i>
                </p>
              </div>
              <p class="avatar-account twitter-gray">Replying to <a class="twitter-blue">${reply.replyTo
          }</a></p>
              <p class="reply-tweet-message">${reply.tweetText}</p>
              <div class="tweet-footer-reply twitter-gray">
                <i class="fa-regular fa-comment-dots" data-comment=${reply.uuid
          } data-is-reply=${reply.isReply}></i>
                <i class="fa-solid fa-heart ${reply.isLiked === true ? "twitter-red" : ""
          }" data-like=${reply.uuid} data-is-reply=${reply.isReply}></i>
                <i class="fa-solid fa-retweet ${reply.isRetweeted === true ? "twitter-limegreen" : ""
          }" data-retweet=${reply.uuid} data-is-reply=${reply.isReply}></i>
              </div>
            </div>
          </div>
        `;
      }
    }
  }
  return feedHtml;
}

function getAvatarReplyContainerContent(reply) {
  let feedHtml = "";
  let space = `<span class="space"></span>`;
  let profilePic = `<img class="profile-pic" alt="avatar tweet" src="${reply.profilePic}"/>`;
  let pipe = `<span class="pipe"></span>`;
  let topPipe = `<span class="top-pipe"></span>`;
  let topEndPipe = `<span class="top-pipe-end-reply"></span>`;

  switch (reply.replyCase) {
    case 1:
      feedHtml = space + profilePic + pipe;
      break;
    case 2:
      feedHtml = topPipe + profilePic + pipe;
      break;
    case 3:
      feedHtml = topEndPipe + profilePic;
      break;
    case 4:
      feedHtml = space + profilePic;
      break;
  }
  return feedHtml;
}

export function renderDeletedTweet() {
  let feedHtml = `<div class="deleted-tweet-container">
    <p>This tweet was deleted !</p>
  </div>
  `;

  return feedHtml;
}

import { getLocalStorageData } from "./localStorage.js";

export function getFeedHtml() {
  let feedData = [];
  let myData = getLocalStorageData();
  for (let tweet of myData) {
    // tweet
    let tweetContainer = document.createElement("div");
    tweetContainer.classList.add("tweet-container");

    // tweet header
    let tweetHeader = document.createElement("div");
    tweetHeader.classList.add("tweet-header");

    let tweetProfilePic = document.createElement("img");
    tweetProfilePic.classList.add("profile-pic");
    tweetProfilePic.src = tweet.profilePic;
    tweetProfilePic.alt = "tweet avatar picture";

    // container of title
    let tweetTitle = document.createElement("div");
    tweetTitle.classList.add("tweet-title");

    // start of title content
    let titleContent = document.createElement("div");
    titleContent.classList.add("title-content");

    let tweetUsername = document.createElement("p");
    tweetUsername.innerText = tweet.username;

    let tweetMenu = document.createElement("i");
    tweetMenu.dataset.menu = tweet.uuid;
    tweetMenu.classList.add("fa-solid", "fa-ellipsis", "tweet-menu");
    tweetMenu.dataset.isReply = tweet.isReply;

    titleContent.append(tweetUsername, tweetMenu);

    // end of titleContent

    let tweetUserAccount = document.createElement("p");
    tweetUserAccount.classList.add("avatar-account", "twitter-gray");

    let UserAccountSmall = document.createElement("small");
    UserAccountSmall.innerHTML = tweet.handle;

    tweetUserAccount.append(UserAccountSmall);
    tweetTitle.append(titleContent, tweetUserAccount);
    tweetHeader.append(tweetProfilePic, tweetTitle);

    // tweet message + date

    let tweetMessage = document.createElement("p");
    tweetMessage.classList.add("tweet-message");
    tweetMessage.innerText = tweet.tweetText;

    let tweetDate = document.createElement("p");
    tweetDate.classList.add("twitter-gray");
    tweetDate.innerHTML = setDotBetweenDate(tweet.date);

    // tweet retweet & like

    let tweetCount = document.createElement("tweet-count");
    tweetCount.classList.add("tweet-count");

    let tweetRetweets = document.createElement("p");
    tweetRetweets.innerText = tweet.retweets + " retweets";

    let tweetLikes = document.createElement("p");
    tweetLikes.innerText = tweet.likes + " likes";

    let tweetReply = document.createElement("p");
    tweetReply.innerText = tweet.replies.length + " Reply";

    tweetCount.append(tweetRetweets, tweetLikes, tweetReply);

    // end retweet & like
    // start of tweet footer

    let tweetFooter = document.createElement("div");
    tweetFooter.classList.add("tweet-footer", "twitter-gray");

    let tweetCommentIcon = document.createElement("i");
    tweetCommentIcon.classList.add("fa-regular", "fa-comment-dots");
    tweetCommentIcon.dataset.comment = tweet.uuid;
    tweetCommentIcon.dataset.isReply = tweet.isReply;

    let tweetLikeIcon = document.createElement("i");
    tweetLikeIcon.classList.add("fa-solid", "fa-heart");
    tweetLikeIcon.dataset.like = tweet.uuid;
    tweetLikeIcon.dataset.isReply = tweet.isReply;
    if (tweet.isLiked === true) {
      tweetLikeIcon.classList.toggle("twitter-red");
    }

    let tweetRetweetIcon = document.createElement("i");
    tweetRetweetIcon.classList.add("fa-solid", "fa-retweet");
    tweetRetweetIcon.dataset.retweet = tweet.uuid;
    tweetRetweetIcon.dataset.isReply = tweet.isReply;
    if (tweet.isRetweeted === true) {
      tweetRetweetIcon.classList.toggle("twitter-limegreen");
    }
    let tweetDeleteIcon = document.createElement("i");
    tweetDeleteIcon.classList.add("fa-solid", "fa-trash-can", "delete");
    tweetDeleteIcon.dataset.menu = tweet.uuid;
    tweetDeleteIcon.dataset.isReply = tweet.isReply;

    tweetFooter.append(
      tweetCommentIcon,
      tweetLikeIcon,
      tweetRetweetIcon,
      tweetDeleteIcon
    );
    //end of tweet footer
    tweetContainer.append(
      tweetHeader,
      tweetMessage,
      tweetDate,
      tweetCount,
      tweetFooter
    );
    // end of tweet

    feedData.push(tweetContainer);
    feedData.push(...getTweetReplies(tweet));
  }
  return feedData;
}

function setDotBetweenDate(tweetDate) {
  let dot = document.createElement("span");
  dot.classList.add("dot");

  return `${tweetDate.substring(
    0,
    8
  )} <span class="dot"></span> ${tweetDate.substring(8)}`;
}

// return array of object
export function getTweetReplies(tweet) {
  let repliesArray = [];
  if (tweet.replies.length > 0) {
    for (let reply of tweet.replies) {
      if (reply.isDeleted) {
        repliesArray.push(renderDeletedTweet());
      } else {
        // start of reply container
        let tweetsReplyContainer = document.createElement("div");
        tweetsReplyContainer.classList.add("tweets-reply-container");

        //start of avatar reply container
        let avatarReplyContainer = document.createElement("div");
        avatarReplyContainer.classList.add("avatar-reply-container");

        avatarReplyContainer.append(...getAvatarReplyContainerContent(reply));
        // end of avatar reply container

        // start of tweet-title container
        let tweetTitle = document.createElement("div");
        tweetTitle.classList.add("tweet-title");

        // start of title content container
        let titleContent = document.createElement("div");
        titleContent.classList.add("title-content");

        // start of p container
        let tweetHead = document.createElement("p");
        tweetHead.innerText = reply.username + " ";

        let avatarAccount = document.createElement("span");
        avatarAccount.classList.add("avatar-account", "twitter-gray");
        avatarAccount.innerText = reply.handle + " ";

        let dot = document.createElement("span");
        dot.classList.add("dot");

        let date = document.createElement("span");
        date.classList.add("twitter-gray");
        date.innerText = " " + reply.date;

        tweetHead.append(avatarAccount, dot, date);
        // end of p container

        // start of menuContainer
        let menuContainer = document.createElement("p");
        menuContainer.classList.add("twitter-gray");

        let menu = document.createElement("i");
        menu.classList.add("fa-solid", "fa-ellipsis", "tweet-menu");
        menu.dataset.menu = reply.uuid;
        menu.dataset.isReply = reply.isReply;

        menuContainer.append(menu);
        // end of menuContainer

        titleContent.append(tweetHead, menuContainer);
        // end of title content container

        // start of reply to
        let account = document.createElement("p");
        account.classList.add("avatar-account", "twitter-gray");

        account.innerHTML = `replying to <a href="#" class="twitter-blue">${reply.replyTo}</a>`;
        // end of reply to

        let replyTweetMessage = document.createElement("p");
        replyTweetMessage.classList.add("reply-tweet-message");
        replyTweetMessage.innerText = reply.tweetText;

        // start of reply tweet footer
        let replyFooter = document.createElement("div");
        replyFooter.classList.add("tweet-footer-reply", "twitter-gray");

        let commentIcon = document.createElement("i");
        commentIcon.classList.add("fa-regular", "fa-comment-dots");
        commentIcon.dataset.comment = reply.uuid;
        commentIcon.dataset.isReply = reply.isReply;

        let likeIcon = document.createElement("i");
        likeIcon.classList.add("fa-solid", "fa-heart");
        likeIcon.dataset.like = reply.uuid;
        likeIcon.dataset.isReply = reply.isReply;
        if (reply.isLiked === true) {
          likeIcon.classList.toggle("twitter-red");
        }

        let retweetIcon = document.createElement("i");
        retweetIcon.classList.add("fa-solid", "fa-retweet");
        retweetIcon.dataset.retweet = reply.uuid;
        retweetIcon.dataset.isReply = reply.isReply;
        if (reply.isRetweeted === true) {
          retweetIcon.classList.toggle("twitter-limegreen");
        }

        replyFooter.append(commentIcon, likeIcon, retweetIcon);
        // end of reply tweet footer

        tweetTitle.append(
          titleContent,
          account,
          replyTweetMessage,
          replyFooter
        );
        // end of tweet title

        tweetsReplyContainer.append(avatarReplyContainer, tweetTitle);
        repliesArray.push(tweetsReplyContainer);
      }
    }
  }
  return repliesArray;
}

function getAvatarReplyContainerContent(reply) {
  let pipeArray = [];

  // every element needed
  let profilePic = document.createElement("img");
  profilePic.classList.add("profile-pic");
  profilePic.src = reply.profilePic;
  profilePic.alt = "avatar tweet";

  let space = document.createElement("span");
  space.classList.add("space");

  let pipe = document.createElement("span");
  pipe.classList.add("pipe");

  let topPipe = document.createElement("span");
  topPipe.classList.add("top-pipe");

  let topEndPipe = document.createElement("span");
  topEndPipe.classList.add("top-pipe-end-reply");

  if (reply.replyCase === 1) {
    pipeArray.push(space, profilePic, pipe);
  }
  if (reply.replyCase === 2) {
    pipeArray.push(topPipe, profilePic, pipe);
  }
  if (reply.replyCase === 3) {
    pipeArray.push(topEndPipe, profilePic);
  }
  if (reply.replyCase === 4) {
    pipeArray.push(space, profilePic);
  }
  return pipeArray;
}

export function renderDeletedTweet() {
  let deleteContainer = document.createElement("div");
  deleteContainer.classList.add("deleted-tweet-container");

  let DeleteMessage = document.createElement("p");
  DeleteMessage.innerText = "this tweet was deleted !";

  deleteContainer.appendChild(DeleteMessage);

  return deleteContainer;
}

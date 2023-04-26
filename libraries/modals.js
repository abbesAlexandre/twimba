import { getLocalStorageData } from "./localStorage.js";
import { getTweetObject, getTweetRepliesObject } from "./tweetObject.js";

export function renderModal(modal, tweetUuid, isReply) {
  let ModalContainer = document.createElement("div");

  switch (modal) {
    case "modal":
      ModalContainer.classList.add("modal");

      let menu = document.createElement("ul");
      menu.classList.add("menu");

      let editTweet = document.createElement("li");
      editTweet.classList.add("edit");
      editTweet.innerText = "Edit Tweet";
      editTweet.dataset.menu = tweetUuid;
      editTweet.dataset.isReply = isReply;

      let editTweetIcon = document.createElement("i");
      editTweetIcon.classList.add("fa-solid", "fa-pen-to-square", "fa-xs");

      editTweet.append(editTweetIcon);

      let deleteTweet = document.createElement("li");
      deleteTweet.classList.add("delete");
      deleteTweet.innerText = "Delete Tweet";
      deleteTweet.dataset.menu = tweetUuid;
      deleteTweet.dataset.isReply = isReply;

      let deleteTweetIcon = document.createElement("i");
      deleteTweetIcon.classList.add("fa-solid", "fa-delete-left", "fa-xs");

      deleteTweet.append(deleteTweetIcon);

      let replyTweet = document.createElement("li");
      replyTweet.classList.add("reply");
      replyTweet.innerText = "Reply Tweet";
      replyTweet.dataset.menu = tweetUuid;
      replyTweet.dataset.isReply = isReply;

      let replyTweetIcon = document.createElement("i");
      replyTweetIcon.classList.add("fa-solid", "fa-reply", "fa-xs");

      replyTweet.append(replyTweetIcon);

      menu.append(editTweet, deleteTweet, replyTweet);

      ModalContainer.appendChild(menu);
      break;
    case "delete-modal":
      ModalContainer.classList.add("delete-modal");

      let deleteMessage = document.createElement("h4");
      deleteMessage.innerText = "Are you sure you want to delete this tweet ?";

      let answerContainer = document.createElement("div");
      answerContainer.classList.add("answer-container");

      let yesBtn = document.createElement("button");
      yesBtn.id = "yes";
      yesBtn.classList.add("twitter-background-blue");
      yesBtn.innerText = "Yes";
      yesBtn.dataset.tweetUuid = tweetUuid;
      yesBtn.dataset.isReply = isReply;

      let noBtn = document.createElement("button");
      noBtn.id = "no";
      noBtn.classList.add("twitter-background-blue");
      noBtn.innerText = "No";

      answerContainer.append(yesBtn, noBtn);

      ModalContainer.append(deleteMessage, answerContainer);
      break;
    default:
      ModalContainer.classList.add("your-reply-container", "edit-modal");

      let myTweet = "";
      let avatarAccountBis = "";
      let replyTarget = "";
      let myData = getLocalStorageData();
      if (isReply === "true") {
        myTweet = getTweetRepliesObject(tweetUuid, myData);
        avatarAccountBis = document.createElement("p");
        avatarAccountBis.classList.add("avatar-account", "twitter-gray");
        avatarAccountBis.innerText = "Replying to";

        replyTarget = document.createElement("a");
        replyTarget.href = "#";
        replyTarget.classList.add("twitter-blue");
        replyTarget.innerText = myTweet.replyTo;
      } else {
        myTweet = getTweetObject(tweetUuid, myData);
      }

      let close = document.createElement("span");
      close.classList.add("fa-solid", "fa-xmark", "fa-lg", "close");

      // start of tweets reply container
      let tweetsReplyContainer = document.createElement("div");
      tweetsReplyContainer.classList.add("tweets-reply-container");

      let avatarReplyContainer = document.createElement("div");
      avatarReplyContainer.classList.add("avatar-reply-container");

      let space = document.createElement("space");
      space.classList.add("space");

      let profilePic = document.createElement("img");
      profilePic.alt = "avatar";
      profilePic.classList.add("profile-pic");
      profilePic.src = myTweet.profilePic;

      let pipe = document.createElement("span");
      pipe.classList.add("pipe");

      avatarReplyContainer.append(space, profilePic, pipe);

      // start of tweet title
      let tweetTitle = document.createElement("div");
      tweetTitle.classList.add("tweet-title");

      let titleContent = document.createElement("div");
      titleContent.classList.add("title-content");

      let userInfos = document.createElement("p");
      userInfos.innerText = myTweet.username;

      let avatarAccount = document.createElement("span");
      avatarAccount.classList.add("avatar-account", "twitter-gray");
      avatarAccount.innerText = myTweet.handle;

      let dot = document.createElement("span");
      dot.classList.add("dot");

      let tweetDate = document.createElement("span");
      tweetDate.classList.add("date");
      tweetDate.innerText = myTweet.date;

      userInfos.append(avatarAccount, dot, tweetDate);
      titleContent.append(userInfos);

      let myTweetText = document.createElement("p");
      myTweetText.classList.add("message");
      myTweetText.id = "message";
      myTweetText.innerText = myTweet.tweetText;
      if (modal === "edit") {
        myTweetText.contentEditable = true;
      }

      tweetTitle.append(titleContent, myTweetText);
      if (avatarAccountBis != "") {
        tweetTitle.append(avatarAccountBis, replyTarget);
      }
      tweetsReplyContainer.append(avatarReplyContainer, tweetTitle);

      let replyBtnContainer = document.createElement("div");
      replyBtnContainer.classList.add("reply-btn-container");

      let replyBtn = document.createElement("button");
      replyBtn.id = "edit-btn";
      replyBtn.innerText = "Edit";
      replyBtn.dataset.uuid = tweetUuid;
      replyBtn.dataset.isReply = isReply;
      replyBtn.disabled = true;

      ModalContainer.append(close, tweetsReplyContainer);
      if (modal === "reply") {
        replyBtn.innerText = "Reply";
        replyBtn.id = "reply-btn";

        let replyContainer = document.createElement("div");
        replyContainer.classList.add("reply-container");

        let replyAvatar = document.createElement("div");
        replyAvatar.classList.add("reply-avatar");

        let topPipe = document.createElement("span");
        topPipe.classList.add("top-pipe");

        let replyProfilePic = document.createElement("img");
        replyProfilePic.src = "images/scrimbalogo.png";
        replyProfilePic.classList.add("profile-pic");

        replyAvatar.append(topPipe, replyProfilePic);

        let yourReply = document.createElement("textarea");
        yourReply.classList.add("your-reply");
        yourReply.id = "tweet-reply";
        yourReply.placeholder = "Tweet your reply";
        yourReply.maxLength = 75;

        replyContainer.append(replyAvatar, yourReply);
        ModalContainer.append(replyContainer);
      }
      replyBtnContainer.append(replyBtn);
      ModalContainer.append(replyBtnContainer);
  }

  if (modal === "edit" || modal === "reply") {
    ModalContainer.classList.add("show-flex");
  } else {
    ModalContainer.classList.add("show");
  }
  document.getElementsByClassName("tweet-feed")[0].append(ModalContainer);
}

export function removeModal(modalClass) {
  if (document.getElementsByClassName(modalClass)[0]) {
    document.getElementsByClassName(modalClass)[0].remove();
    document.getElementsByTagName("html")[0].style.overflow = "scroll";
  }
}

import { tweetsData } from "/data.js";

const deleteModal = document.getElementsByClassName("delete-modal")[0];
const modal = document.getElementsByClassName("modal")[0];
const reply = document.getElementsByClassName('your-reply-container')[0];
const yourReply = document.getElementsByClassName('your-reply')[0];
const replyBtn = document.getElementById('reply-btn');
const myBody = document.body;
const myHtml = document.getElementsByTagName('html')[0];

document.addEventListener("click", function (e) {
/** opening three dot menu */
  if (e.target.classList.contains("tweet-menu")) {
    let rect = e.target.getBoundingClientRect();
    modal.classList.toggle("show");
    
    /** setting position depending of the screen width */
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
/** closing three dot menu if click outside box */    
  } else if (!e.target.parentNode.classList.contains("menu")){
    modal.classList.remove("show");
  }

/** opening reply/edit modal  */
  
  if (e.target.classList.contains('reply') || e.target.classList.contains('edit')){
    reply.classList.toggle("show-flex");
    modal.classList.remove("show");
    myBody.classList.toggle("smoke-background");
    myHtml.style.overflow="hidden";
    if(e.target.classList.contains('edit')){
      replyBtn.innerText="Save";
      yourReply.innerText="There was once opon a time a mad dev";
    }
  }

  /** Closing reply/edit modal */

  if(e.target.classList.contains('close')){  
    reply.classList.remove("show-flex");
    myBody.classList.remove("smoke-background");
    myHtml.style.overflow="scroll";
    replyBtn.innerText="Reply";
    yourReply.innerText="";
  }

  /** opening delete modal */
  if(e.target.classList.contains("delete")){
    deleteModal.classList.toggle("show");
    modal.classList.remove("show");
    myHtml.style.overflow="hidden";
  }

  /** close/complete delete tweet modal */
  if(e.target.id==="yes"){
    console.log("we will delete here")
  }
  if(e.target.id==="no"){
    deleteModal.classList.remove("show");
  }
});

function setDotBetweenDate(tweetDate) {
  let dot = document.createElement("span");
  dot.classList.add("dot");

  return `${tweetDate.substring(
    0,
    8
  )} <span class="dot"></span> ${tweetDate.substring(8)}`;
}

/* rendering data */

function getFeedHtml() {
  let feedData = [];
  for (let tweet of tweetsData) {
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
    tweetMenu.dataset.dataMenu= tweet.uuid;
    tweetMenu.classList.add("fa-solid", "fa-ellipsis", "tweet-menu");

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
    tweetCommentIcon.dataset.dataComment = tweet.uuid;

    let tweetLikeIcon = document.createElement("i");
    tweetLikeIcon.classList.add("fa-solid", "fa-heart");
    tweetLikeIcon.dataset.dataLike = tweet.uuid;

    let tweetRetweetIcon = document.createElement("i");
    tweetRetweetIcon.classList.add("fa-solid", "fa-retweet");
    tweetRetweetIcon.dataset.dataRetweet = tweet.uuid;

    let tweetDeleteIcon = document.createElement("i");
    tweetDeleteIcon.classList.add("fa-solid", "fa-trash-can", "delete");
    tweetDeleteIcon.dataset.dataDelete = tweet.uuid;

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

// return array of object
function getTweetReplies(tweet) {
  let repliesArray = [];
  if (tweet.replies.length > 0) {
    for (let reply of tweet.replies) {
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

      let likeIcon = document.createElement("i");
      likeIcon.classList.add("fa-solid", "fa-heart");

      let retweetIcon = document.createElement("i");
      retweetIcon.classList.add("fa-solid", "fa-retweet");

      replyFooter.append(commentIcon, likeIcon, retweetIcon);
      // end of reply tweet footer

      tweetTitle.append(titleContent, account, replyTweetMessage, replyFooter);
      // end of tweet title

      tweetsReplyContainer.append(avatarReplyContainer, tweetTitle);
      repliesArray.push(tweetsReplyContainer);
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
  if(e.target.innerText === "Reply"){
    alert("test ok")
  }
})


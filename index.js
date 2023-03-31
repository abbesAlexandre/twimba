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

replyBtn.addEventListener('click', function(e){
  if(e.target.innerText === "Save"){
    alert("test ok")
  }
  if(e.target.innerText === "Reply"){
    alert("test ok")
  }
})


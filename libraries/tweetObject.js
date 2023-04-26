export function getTweetObject(TweetUuid, myData) {
  const targetTweetObj = myData.filter(function (tweet) {
    return tweet.uuid === TweetUuid;
  })[0];
  return targetTweetObj;
}

export function getTweetAndRepliesIndex(TweetUuid, myData) {
  let index = [];
  for (let tweet of myData) {
    for (let reply of tweet.replies) {
      if (reply.uuid === TweetUuid) {
        index.push(myData.indexOf(tweet));
        index.push(tweet.replies.indexOf(reply));
      }
    }
  }
  return index;
}

export function getTweetRepliesObject(tweetUuid, myData) {
  const indexes = getTweetAndRepliesIndex(tweetUuid, myData);
  return myData[indexes[0]].replies[indexes[1]];
}

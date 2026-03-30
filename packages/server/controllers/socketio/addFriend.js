const redisClient = require("../../redis");
const addFriend = async (socket, friendName, cb) => {
  if (friendName === socket.user.username) {
    cb({ done: false, errorMsg: "You cannot add yourself" });
    return;
  }
  const friend = await redisClient.hGetAll(`userid:${friendName}`);
  if (!friend) {
    cb({ done: false, errorMsg: "User doesnt exist!" });
    return;
  }
  const friendsList = await redisClient.lRange(
    `friends:${socket.user.username}`,
    0,
    -1,
  );
  if (friendsList.length > 0 && friendsList.includes(friendName)) {
    cb({ done: false, errorMsg: "Friend already exists!" });
    return;
  }
  redisClient.lPush(
    `friends:${socket.user.username}`,
    `${friendName}.${friend.userid}`,
  );
  cb({
    done: true,
    newFriend: {
      username: friendName,
      userid: friend.userid,
      connected: friend.connected,
    },
  });
};

module.exports = addFriend;

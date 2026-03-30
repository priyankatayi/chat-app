const redisClient = require("../../redis");

const parseFriendsList = async (friendsList) => {
  const newFriendsList = [];
  for (let friend of friendsList) {
    const parsedFriend = friend.split(".");
    const userid = parsedFriend[1];
    const username = parsedFriend[0];
    const connected = await redisClient.hGet(`userid:${username}`, "connected");
    newFriendsList.push({ userid, username, connected });
  }
  return newFriendsList;
};

module.exports = parseFriendsList;

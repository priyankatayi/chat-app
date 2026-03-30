const redisClient = require("../../redis");
const parseFriendsList = require("./parseFriendsList");

const onDisconnect = async (socket) => {
  await redisClient.hSet(`userid:${socket.user.username}`, {
    connected: "false",
  });
  //get all the friends and let them know the user is disconnected

  const friendsList = await redisClient.lRange(
    `friends:${socket.user.username}`,
    0,
    -1,
  );

  const friendRooms = await parseFriendsList(friendsList).then((friends) =>
    friends.map((friend) => friend.userid),
  );

  socket.to(friendRooms).emit("connected", "false", socket.user.username);
};

module.exports = onDisconnect;

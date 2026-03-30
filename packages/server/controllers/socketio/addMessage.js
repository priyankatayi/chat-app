const redisClient = require("../../redis");

const addMessage = async (socket, message) => {
  message.from = socket.user.userid;
  const messageString = `${message.to}.${message.from}.${message.content}`;
  await redisClient.lPush(`messages:${message.from}`, messageString);
  await redisClient.lPush(`messages:${message.to}`, messageString);
  socket.to(message.to).emit("message", message);
};

module.exports = addMessage;

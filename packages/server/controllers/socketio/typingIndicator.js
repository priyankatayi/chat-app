const redisClient = require("../../redis");

const addTypingIndicator = async (socket, to) => {
  socket.to(to).emit("typing", {
    from: socket.user.userid,
    to,
  });
};

const removeTypingIndicator = async (socket, to) => {
  socket.to(to).emit("stop_typing", {
    from: socket.user.userid,
    to,
  });
};

module.exports = { addTypingIndicator, removeTypingIndicator };

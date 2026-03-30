const authorizeUser = require("./socketio/authorizeUser");
const addFriend = require("./socketio/addFriend");
const onDisconnect = require("./socketio/onDisconnect");
const addMessage = require("./socketio/addMessage");

module.exports = {
  addFriend,
  authorizeUser,
  onDisconnect,
  addMessage,
};

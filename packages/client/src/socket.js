import { io } from "socket.io-client";

const socket = new io("https://whatsapp-clone-server-1rbm.onrender.com/", {
  autoConnect: false,
  withCredentials: true,
});

export default socket;

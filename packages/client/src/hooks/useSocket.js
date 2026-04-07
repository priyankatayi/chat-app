import { useEffect } from "react";
import socket from "../socket";
import { useAccountContext } from "../AccountContextProvider";
const useSocket = (setFriendsList, setMessages, friendsList) => {
  const showNotification = (title, options = {}) => {
    if (
      Notification.permission === "granted" &&
      document.visibilityState === "hidden"
    ) {
      const notification = new Notification(title, {
        body: options.body || "",
        ...options,
      });

      notification.onclick = () => {
        window.focus();
      };
    }
  };
  const { setIsLoggedIn } = useAccountContext();
  useEffect(() => {
    socket.connect();
    socket.on("connect_error", () => {
      setIsLoggedIn(false);
    });

    socket.on("friendsList", (friendsList) => {
      setFriendsList(friendsList);
    });

    socket.on("messages", (messages) => {
      setMessages(messages);
    });

    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
      const friend = friendsList.find(
        (person) => person.userid === message.from,
      );
      showNotification(`Message from ${friend?.username}`, {
        body: message.content,
      });
    });

    socket.on("connected", (status, username) => {
      setFriendsList((prev) =>
        prev.map((friend) =>
          friend.username === username
            ? { ...friend, connected: status }
            : friend,
        ),
      );
    });

    return () => {
      socket.off("connect_error");
      socket.off("connected");
      socket.off("friendsList");
      socket.off("messages");
      socket.off("message");
    };
  }, [setFriendsList, setMessages, setIsLoggedIn, friendsList]);
};

export default useSocket;

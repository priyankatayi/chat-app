import { useEffect } from "react";
import socket from "../socket";
import { useAccountContext } from "../AccountContextProvider";
import { capitalize } from "../utils/stringUtils";

const useSocket = (setFriendsList, setMessages, friendsList, setIsTyping) => {
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
      showNotification(`Message from ${capitalize(friend?.username)}`, {
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

    socket.on("typing", () => {
      setIsTyping(true);
    });

    socket.on("stop_typing", () => {
      setIsTyping(false);
    });

    return () => {
      socket.off("connect_error");
      socket.off("connected");
      socket.off("friendsList");
      socket.off("messages");
      socket.off("message");
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, [setFriendsList, setMessages, setIsLoggedIn, friendsList, setIsTyping]);
};

export default useSocket;

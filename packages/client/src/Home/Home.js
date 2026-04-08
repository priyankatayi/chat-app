import React, { useEffect, useState } from "react";
import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import useSocket from "../hooks/useSocket";
export const FriendsContext = React.createContext();
export const MessagesContext = React.createContext();
function Home() {
  const [friendsList, setFriendsList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [friendsIndex, setFriendsIndex] = useState(0);
  useSocket(setFriendsList, setMessages, friendsList);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (!("Notification" in window)) {
        console.log("This browser does not support notifications");
        return;
      }

      const permission = await Notification.requestPermission();
      console.log("Permission:", permission);
    };
    requestNotificationPermission();
  }, []);
  return (
    <FriendsContext.Provider value={{ friendsList, setFriendsList }}>
      <Grid
        templateColumns={{ base: "1fr", md: "300px 1fr" }}
        h="100vh"
        as={Tabs}
        onChange={(index) => setFriendsIndex(index)}
      >
        <GridItem borderRight="1px solid gray">
          <Sidebar />
        </GridItem>
        <GridItem maxH="100vh">
          <MessagesContext.Provider value={{ messages, setMessages }}>
            <Chat userid={friendsList[friendsIndex]?.userid} />
          </MessagesContext.Provider>
        </GridItem>
      </Grid>
    </FriendsContext.Provider>
  );
}

export default Home;

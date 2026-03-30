import React, { useState } from "react";
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
  useSocket(setFriendsList, setMessages);
  return (
    <FriendsContext.Provider value={{ friendsList, setFriendsList }}>
      <Grid
        templateColumns="repeat(10, 1fr)"
        h="100vh"
        as={Tabs}
        onChange={(index) => setFriendsIndex(index)}
      >
        <GridItem colSpan="3" borderRight="1px solid gray">
          <Sidebar />
        </GridItem>
        <GridItem colSpan="7" maxH="100vh">
          <MessagesContext.Provider value={{ messages, setMessages }}>
            <Chat userid={friendsList[friendsIndex]?.userid} />
          </MessagesContext.Provider>
        </GridItem>
      </Grid>
    </FriendsContext.Provider>
  );
}

export default Home;

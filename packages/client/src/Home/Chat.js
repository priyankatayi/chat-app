import { TabPanel, TabPanels, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import { FriendsContext, MessagesContext } from "./Home";
import Chatbox from "./Chatbox";
import FriendPanel from "./FriendPanel";

function Chat({ userid }) {
  const { friendsList } = useContext(FriendsContext);
  const { messages, typing } = useContext(MessagesContext);

  return friendsList.length > 0 ? (
    <VStack h="100%" justify="end">
      <TabPanels overflowY="scroll">
        {friendsList.map((friend) => (
          <VStack flexDir="column" as={TabPanel} w="100%">
            <FriendPanel
              friend={friend}
              typing={typing}
              messages={messages}
              userid={userid}
            />
          </VStack>
        ))}
      </TabPanels>
      <Chatbox userid={userid} />
    </VStack>
  ) : (
    <VStack
      textAlign="center"
      justifyContent="center"
      w="100%"
      pt="5rem"
      fontSize="lg"
    >
      <TabPanels>
        <TabPanel>
          {" "}
          <Text>No Friends! Add Friends to start Chatting</Text>
        </TabPanel>
      </TabPanels>
    </VStack>
  );
}

export default Chat;

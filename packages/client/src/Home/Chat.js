import { TabPanel, TabPanels, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import { FriendsContext, MessagesContext } from "./Home";
import Chatbox from "./Chatbox";

function Chat({ userid }) {
  const { friendsList } = useContext(FriendsContext);
  const { messages } = useContext(MessagesContext);
  const bottomDiv = useRef(null);

  useEffect(() => bottomDiv.current?.scrollIntoView());

  return friendsList.length > 0 ? (
    <VStack h="100%" justify="end">
      <TabPanels overflowY="scroll">
        {friendsList.map((friend) => (
          <VStack flexDir="column" as={TabPanel} w="100%">
            {messages
              .filter(
                (message) =>
                  message.to === friend.userid ||
                  message.from === friend.userid,
              )
              .map((msg) => (
                <Text
                  m={
                    msg.to === friend.userid
                      ? "1rem 0 0 auto !important"
                      : "1rem auto 0 0 !important"
                  }
                  fontSize="lg"
                  bg={msg.to === friend.userid ? "blue.100" : "gray.100"}
                  key={`msg:${friend.userid}`}
                  color="gray.800"
                  borderRadius="10px"
                  p="0.5rem 1rem"
                  maxW="50%"
                >
                  {msg.content}
                </Text>
              ))}

            <div ref={bottomDiv} />
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

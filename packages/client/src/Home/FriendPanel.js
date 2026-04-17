import React, { useEffect, useRef } from "react";
import { Text } from "@chakra-ui/react";

const FriendPanel = ({ messages, typing, friend, userid }) => {
  const bottomDivRef = useRef(null);

  useEffect(
    () => bottomDivRef.current?.scrollIntoView({ behavior: "smooth" }),
    [messages, typing],
  );
  return (
    <>
      {messages
        .filter(
          (message) =>
            message.to === friend.userid || message.from === friend.userid,
        )
        .map((msg, index) => (
          <Text
            m={
              msg.to === friend.userid
                ? "1rem 0 0 auto !important"
                : "1rem auto 0 0 !important"
            }
            fontSize="lg"
            bg={msg.to === friend.userid ? "blue.100" : "gray.100"}
            key={`msg:${friend.userid}:${index}`}
            color="gray.800"
            borderRadius="10px"
            p="0.5rem 1rem"
            maxW="50%"
          >
            {msg.content}
          </Text>
        ))}
      {typing && (
        <Text fontSize="sm" color="gray.500" textAlign="center">
          typing...
        </Text>
      )}

      <div ref={bottomDivRef} />
    </>
  );
};

export default FriendPanel;

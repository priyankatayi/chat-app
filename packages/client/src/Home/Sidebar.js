import {
  Heading,
  HStack,
  VStack,
  Button,
  Divider,
  TabList,
  Tab,
  Text,
  Circle,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { FriendsContext } from "./Home";
import AddFriend from "./AddFriend";
import { useDisclosure } from "@chakra-ui/react";

function Sidebar() {
  const { friendsList } = useContext(FriendsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack py="1.4rem">
        <HStack justify="space-around" w="100%">
          <Heading size="md">Add Friend</Heading>
          <Button onClick={onOpen}>
            <ChatIcon />
          </Button>
        </HStack>
        <Divider />
        {friendsList.map((friend) => (
          <VStack as={TabList}>
            <HStack as={Tab}>
              <Circle
                bg={friend.connected === "true" ? "green.500" : "red.500"}
                w="20px"
                h="20px"
              />
              <Text>{friend.username}</Text>
            </HStack>
          </VStack>
        ))}
      </VStack>

      <AddFriend isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Sidebar;

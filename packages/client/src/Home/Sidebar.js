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
import { useAccountContext } from "../AccountContextProvider";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

function Sidebar() {
  const { friendsList } = useContext(FriendsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setIsLoggedIn } = useAccountContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await res.json();
      if (data.loggedIn === false) {
        socket.disconnect();
        navigate("/login");
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <VStack h="100%" align="stretch">
      <VStack py="1.4rem">
        <HStack justify="space-around" w="100%">
          <Heading size="md">Add Friend</Heading>
          <Button onClick={onOpen}>
            <ChatIcon />
          </Button>
        </HStack>
        <Divider />
        {friendsList.map((friend) => (
          <VStack as={TabList} key={friend.userid}>
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

      <Button
        mt="auto"
        mx={4}
        mb={4}
        size="sm"
        colorScheme="red"
        w="calc(100% - 32px)" // full width with side spacing
        onClick={handleLogout}
      >
        Logout
      </Button>
      <AddFriend isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
}

export default Sidebar;

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
import { AddIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { FriendsContext } from "./Home";
import AddFriend from "./AddFriend";
import { useDisclosure } from "@chakra-ui/react";
import { useAccountContext } from "../AccountContextProvider";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import { capitalize } from "../utils/stringUtils";

function Sidebar() {
  const { friendsList } = useContext(FriendsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setIsLoggedIn, userName } = useAccountContext();
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
            <AddIcon />
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
              <Text>{capitalize(friend.username)}</Text>
            </HStack>
          </VStack>
        ))}
      </VStack>

      <VStack
        spacing={2}
        px={4}
        py={3}
        borderTop="1px solid #2D2D2D"
        align="stretch"
        mt="auto"
      >
        <HStack spacing={3}>
          <Circle bg="green.400" size="30px" />
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold">{capitalize(userName)}</Text>
            <Text fontSize="xs" color="gray.400">
              Online
            </Text>
          </VStack>
        </HStack>

        <Button size="sm" colorScheme="red" w="100%" onClick={handleLogout}>
          Logout
        </Button>
      </VStack>

      <AddFriend isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
}

export default Sidebar;

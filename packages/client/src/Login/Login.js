import React, { useState } from "react";
import {
  VStack,
  ButtonGroup,
  Button,
  Heading,
  Text,
  Box,
  Icon,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

import { formSchema } from "@whatsapp-clone/common";

import { useAccountContext } from "../AccountContextProvider";
import TextField from "./TextField";

function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserName } = useAccountContext();
  const [error, setError] = useState("");

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={formSchema}
      onSubmit={(values, actions) => {
        const val = { ...values };
        actions.resetForm();
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(val),
        })
          .catch((err) => {
            return;
          })
          .then((res) => {
            if (!res.ok || !res || res.status >= 400) return;
            return res.json();
          })
          .then((data) => {
            if (!data) return;
            if (data.status) {
              setError(data.status);
            } else if (data.loggedIn) {
              setIsLoggedIn(data.loggedIn);
              setUserName(data.username);
              if (data.loggedIn) {
                navigate("/home");
              }
            }
          });
      }}
    >
      <VStack
        as={Form}
        m="auto"
        w={{ base: "90%", md: "500px" }}
        justify="center"
        h="100vh"
        spacing="1rem"
      >
        <Box textAlign="center" mb="1rem" mt="auto">
          <Icon as={ChatIcon} w={10} h={10} color="teal.500" mb="0.5rem" />
          <Heading size="lg">ChatApp</Heading>
          <Text color="gray.500" fontSize="sm">
            Log in to your ChatApp account
          </Text>
        </Box>
        <Text as="p" color="red.500">
          {error}
        </Text>
        <TextField
          name="username"
          placeholder="Enter username"
          autoComplete="off"
          label="Username"
        />

        <TextField
          name="password"
          placeholder="Enter Password"
          autoComplete="off"
          type="password"
          label="Password"
        />
        <ButtonGroup pt="1rem">
          <Button colorScheme="teal" type="submit">
            Login
          </Button>
          <Button onClick={() => navigate("/register")}>Create Account </Button>
        </ButtonGroup>
        <Text fontSize="xs" color="gray.400" pt="1rem" mt="auto" mb="1rem">
          This is a personal chat application. Your credentials are only used to
          access your ChatApp account.
        </Text>
      </VStack>
    </Formik>
  );
}

export default Login;

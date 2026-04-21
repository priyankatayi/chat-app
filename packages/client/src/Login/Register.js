import React, { useState } from "react";
import {
  Input,
  FormControl,
  FormErrorMessage,
  VStack,
  FormLabel,
  ButtonGroup,
  Button,
  Heading,
  Text,
  Box,
  Icon,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { formSchema } from "@whatsapp-clone/common";
import { useAccountContext } from "../AccountContextProvider";

function Register() {
  const { setIsLoggedIn, setUserName } = useAccountContext();

  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: formSchema,
    onSubmit: (values, actions) => {
      fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      })
        .catch((err) => console.log(err))
        .then((res) => {
          if (!res.ok || !res || res.status >= 400) return;
          return res.json();
        })
        .then((data) => {
          if (!data) return;
          if (data.status) {
            setError(data.status);
          } else {
            setIsLoggedIn(data.loggedIn);
            setUserName(data.username);
            if (data.loggedIn) {
              navigate("/home");
            }
          }
        });
      actions.resetForm();
    },
  });
  const navigate = useNavigate();
  return (
    <VStack
      as="form"
      m="auto"
      w={{ base: "90%", md: "500px" }}
      justify="center"
      h="100vh"
      spacing="1rem"
      onSubmit={formik.handleSubmit}
    >
      <Box textAlign="center" mb="1rem" mt="auto">
        <Icon as={ChatIcon} w={10} h={10} color="teal.500" mb="0.5rem" />
        <Heading size="lg">ChatApp</Heading>
        <Text color="gray.500" fontSize="sm">
          Sign in to your ChatApp account
        </Text>
      </Box>
      <Text as="p" color="red.500">
        {error}
      </Text>
      <FormControl
        isInvalid={formik.errors.username && formik.touched.username}
      >
        <FormLabel fontSize="lg">Username</FormLabel>
        <Input
          name="username"
          placeholder="Enter username"
          autoComplete="off"
          size="lg"
          {...formik.getFieldProps("username")}
        />
        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={formik.errors.password && formik.touched.password}
      >
        <FormLabel fontSize="lg">Password</FormLabel>
        <Input
          name="password"
          placeholder="Enter Password"
          autoComplete="off"
          size="lg"
          type="password"
          {...formik.getFieldProps("password")}
        />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        <ButtonGroup pt="1rem">
          <Button colorScheme="teal" type="submit">
            Create Account{" "}
          </Button>
          <Button onClick={() => navigate("/")} leftIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </ButtonGroup>
      </FormControl>
      <Text fontSize="xs" color="gray.400" pt="1rem" mt="auto" mb="1rem">
        This is a personal chat application. Your credentials are only used to
        access your ChatApp account.
      </Text>
    </VStack>
  );
}

export default Register;

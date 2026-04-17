import { HStack, Button, Input } from "@chakra-ui/react";
import { Field, Formik, Form } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { MessagesContext } from "./Home";
import socket from "../socket";

function Chatbox({ userid }) {
  const { setMessages } = useContext(MessagesContext);
  const [typing, setTyping] = useState(false);

  const handleTyping = (e) => {
    if (!typing) {
      setTyping(true);
      socket.emit("typing", { to: userid });
    }
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      setTyping(false);
      socket.emit("stop_typing", { to: userid });
    }, 1000);
  };

  return (
    <Formik
      initialValues={{ message: "" }}
      validationSchema={Yup.object({
        message: Yup.string().min(1).max(255),
      })}
      onSubmit={(values, actions) => {
        const message = { to: userid, content: values.message, from: null };
        socket.emit("message", message);
        setMessages((prev) => [...prev, message]);
        socket.emit("stop_typing", { to: userid });
        actions.resetForm();
      }}
    >
      {({ handleChange }) => (
        <HStack as={Form} w="100%" pb="1.4rem" px="1.4rem">
          <Field name="message">
            {({ field }) => (
              <Input
                {...field}
                placeholder="Type your message here..."
                size="lg"
                autoComplete="off"
                onChange={(e) => {
                  handleChange(e);
                  handleTyping(e);
                }}
              />
            )}
          </Field>
          <Button colorScheme="teal" size="lg" type="submit">
            Send
          </Button>
        </HStack>
      )}
    </Formik>
  );
}

export default Chatbox;

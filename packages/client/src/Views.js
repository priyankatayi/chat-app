import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Home from "./Home/Home";
import ProtectedRoute from "./ProtectedRoute";
import { useAccountContext } from "./AccountContextProvider";
import { Text } from "@chakra-ui/react";

function Views() {
  const { loggedIn } = useAccountContext();

  if (loggedIn === null) {
    return <Text>...loading</Text>;
  }
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />{" "}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Views;

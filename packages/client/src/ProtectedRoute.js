import React from "react";
import { Navigate } from "react-router-dom";
import { useAccountContext } from "./AccountContextProvider";

const useAuth = () => {
  const { loggedIn } = useAccountContext();
  return { loggedIn };
};
function ProtectedRoute({ children }) {
  const { loggedIn } = useAuth();
  if (!loggedIn) return <Navigate to="/login" />;
  return <div>{children}</div>;
}

export default ProtectedRoute;

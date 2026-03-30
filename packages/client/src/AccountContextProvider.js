import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountContext = createContext();

export const useAccountContext = () => useContext(AccountContext);

const AccountContextProvider = ({ children }) => {
  const [loggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch("http://localhost:4000/auth/login", {
        credentials: "include",
      });
      const val = await res.json();
      setIsLoggedIn(val.loggedIn);
      navigate("/home");
    };
    checkUser();
  }, []);
  return (
    <AccountContext.Provider value={{ loggedIn, setIsLoggedIn }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContextProvider;

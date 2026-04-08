import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountContext = createContext();

export const useAccountContext = () => useContext(AccountContext);

const AccountContextProvider = ({ children }) => {
  const [loggedIn, setIsLoggedIn] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/auth/login`,
        {
          credentials: "include",
        },
      );
      const val = await res.json();
      setUserName(val.username);
      setIsLoggedIn(val.loggedIn);
      if (val.loggedIn) {
        navigate("/home");
      }
    };
    checkUser();
  }, [navigate]);
  return (
    <AccountContext.Provider
      value={{ loggedIn, setIsLoggedIn, userName, setUserName }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContextProvider;

import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_METHODS } from "../utils/dec";
import Http from "./Http";
const UserContext = createContext({
  id: "",
  userName: "",
  authorized: false,
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const signUp = (user) => {
    Http.Post(API_METHODS.SIGN_UP, user)
      .then(() => {
        navigate("/Login", { replace: true });
      })
      .catch((err) => console.log(err, "sign up"));
  };

  const logIn = (user) => {
    setUser(user);
    navigate("/", { replace: true });
  };

  const logOut = () => {
    setUser({});
    navigate("/", { replace: true });
  };

  return (
    <UserContext.Provider value={{ user, setUser, signUp, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

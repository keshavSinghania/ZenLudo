import React from "react";
import { useSelector } from "react-redux";
import SignIn from "../pages/AuthPages/SignIn";
import LudoLoader from "../Components/LudoLoader";

const ProtectedRoutes = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === null) {
    return <LudoLoader loadingMessage="Loading..." />;
  }

  return isLoggedIn ? children : <SignIn />;
};

export default ProtectedRoutes;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LudoLoader from "../Components/LudoLoader";

const PublicRoutes = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === null) return <LudoLoader loadingMessage="Checking..." />;

  return isLoggedIn ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoutes;
import React, { useEffect, useState } from "react";
import SignIn from "./SignIn.jsx";
import NetworkError from "../../Components/NetworkError.jsx";
import { useDispatch } from "react-redux";
import { logout } from "../../ReactRedux/authSlice.js";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      localStorage.removeItem("token");
      dispatch(logout()); 
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(true); 
    }
  }, [dispatch]);

  return <>{error ? <NetworkError retry={() => window.location.reload()} /> : <SignIn />}</>;
};

export default Logout;

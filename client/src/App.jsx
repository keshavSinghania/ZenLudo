import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout , updateProfileData} from "./ReactRedux/authSlice.js";
import axiosInstance from "./api/axios.js"
import LudoLoader from "./Components/LudoLoader.jsx";
import NetworkError from "./Components/NetworkError.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        dispatch(logout());
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get("/auth/fetch-user-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.success) {
          dispatch(login({authToken: token }));
          dispatch(updateProfileData(response?.data?.data))
        } else {
          dispatch(logout());
        }
      } catch (err) {
        if (!err.response) {
          setNetworkError(true);
        } else {
          dispatch(logout());
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (loading) return <LudoLoader loadingMessage={"PLEASE WAIT..."} />;
  if (networkError) return <NetworkError retry={() => window.location.reload()} />;

  return <RouterProvider router={router} />;
};

export default App;

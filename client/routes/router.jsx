import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/AuthPages/SignIn.jsx";
import OtpVerification from "../pages/AuthPages/OtpVerification.jsx";
import ForgotPassword from "../pages/AuthPages/ForgotPassword.jsx";
import ResetPassword from "../pages/AuthPages/ResetPassword.jsx";
import LoginWithOtp from "../pages/AuthPages/LoginWithOtp.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import PlayWithBots from "../pages/Dashboard/PlayWithBots.jsx";
import CreateJoinRoom from "../pages/Dashboard/CreateJoinRoom.jsx";
import PlayWithFriends from "../pages/Dashboard/PlayWithFriends.jsx"
import PlayLocalBoard from "../LudoBoardMain/PlayLocalBoard.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import Logout from "../pages/AuthPages/Logout.jsx";
import PublicRoutes from "./PublicRoutes.jsx";

const Friends = () => <div className="text-white text-3xl">Friends</div>;
const History = () => <div className="text-white text-3xl">History</div>;
const Profile = () => <div className="text-white text-3xl">Profile</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes><SignIn /></PublicRoutes>,
  },
  {
    path: "/otp-verification",
    element: <PublicRoutes><OtpVerification /></PublicRoutes> ,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <ProtectedRoutes><PlayWithBots /></ProtectedRoutes>,
      },
      {
        path: "play-with-bots",
        element: <ProtectedRoutes><PlayWithBots /></ProtectedRoutes>,
      },
      {
        path: "play-with-friends",
        element: <ProtectedRoutes><PlayWithFriends /></ProtectedRoutes>,
      },
      {
        path: "create-join-room",
        element: <ProtectedRoutes><CreateJoinRoom /></ProtectedRoutes>,
      },
      {
        path: "friends",
        element: <ProtectedRoutes><Friends /></ProtectedRoutes>
      },
      {
        path: "history",
        element: <ProtectedRoutes><History /></ProtectedRoutes>,
      },
      {
        path: "profile",
        element: <ProtectedRoutes><Profile /></ProtectedRoutes>,
      },
      {
        path: "logout",
        element: <Logout />
      },
    ],
  },
  {
    path: "/forgot-password",
    element: <PublicRoutes><ForgotPassword /></PublicRoutes>,
  },
  {
    path: "/reset-password",
    element: <PublicRoutes><ResetPassword /></PublicRoutes>,
  },
  {
    path: "/login-with-otp",
    element: <PublicRoutes><LoginWithOtp /></PublicRoutes>,
  },
  {
    path: "/play/local",
    element: <ProtectedRoutes><PlayLocalBoard /></ProtectedRoutes>,
  },
  {
    path: "*",
    element: <div className="text-red-500 text-3xl text-center p-10">404 - Page Not Found</div>,
  },
]);

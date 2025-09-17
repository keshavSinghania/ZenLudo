import { createBrowserRouter } from "react-router-dom";

// Auth Pages
import SignIn from "../pages/AuthPages/SignIn";
import OtpVerification from "../pages/AuthPages/OtpVerification";
import ForgotPassword from "../pages/AuthPages/ForgotPassword";
import ResetPassword from "../pages/AuthPages/ResetPassword";
import LoginWithOtp from "../pages/AuthPages/LoginWithOtp";
import Logout from "../pages/AuthPages/Logout";

// Dashboard Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import PlayWithBots from "../pages/Dashboard/PlayWithBots";
import PlayWithFriends from "../pages/Dashboard/PlayWithFriends";
import CreateJoinRoom from "../pages/Dashboard/CreateJoinRoom";

// Ludo Board
import PlayLocalBoard from "../LudoBoardMain/PlayLocalBoard";

// Routes helpers
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import Notice from "../pages/Dashboard/Notice";
import AddFriends from "../pages/Dashboard/AddFriends";
import Friends from "../pages/Dashboard/Friends";


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
        element: <ProtectedRoutes><Notice/></ProtectedRoutes>,
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
        element: <ProtectedRoutes><Friends/></ProtectedRoutes>
      },
      {
        path: "add-friends",
        element: <ProtectedRoutes><AddFriends></AddFriends></ProtectedRoutes>
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
        path: "notice",
        element: <ProtectedRoutes><Notice/></ProtectedRoutes>,
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

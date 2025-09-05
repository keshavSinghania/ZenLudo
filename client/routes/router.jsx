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
import LudoBoard from "../LudoBoardMain/LudoBoard.jsx";

const Friends = () => <div className="text-white text-3xl">Friends</div>;
// const History = () => <div className="text-white text-3xl">History</div>;
const Profile = () => <div className="text-white text-3xl">Profile</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/otp-verification",
    element: <OtpVerification />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <PlayWithBots />,
      },
      {
        path: "play-with-bots",
        element: <PlayWithBots />,
      },
      {
        path: "play-with-friends",
        element: <PlayWithFriends />,
      },
      {
        path: "create-join-room",
        element: <CreateJoinRoom />,
      },
      {
        path: "friends",
        element: <Friends/>
      },
      {
        path: "history",
        element: <LudoBoard/>,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/login-with-otp",
    element: <LoginWithOtp />,
  },
  {
    path: "/game",
    element: <LudoBoard/>,
  },
  {
    path: "*",
    element: <div className="text-red-500 text-3xl text-center p-10">404 - Page Not Found</div>,
  },
]);

import { createBrowserRouter } from "react-router-dom"
import App from "../src/App.jsx"
import SignIn from "../pages/AuthPages/SignIn.jsx"
import OtpVerification from "../pages/AuthPages/OtpVerification.jsx"
import ForgotPassword from "../pages/AuthPages/ForgotPassword.jsx"
import ResetPassword from "../pages/AuthPages/ResetPassword.jsx"
import LoginWithOtp from "../pages/AuthPages/LoginWithOtp.jsx"
import DashboardLeft from "../pages/Dashboard/ZenLudo.jsx"
import ZenLudo from "../pages/Dashboard/ZenLudo.jsx"


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/login-register",
        element: <SignIn/>
    },
    {
        path: "/otp-verification",
        element: <OtpVerification/>,
    }, {
        path: "/dashboard",
        element: <ZenLudo/>,
    },{
        path: "/forgot-password",
        element: <ForgotPassword/>
    },
    {
        path: "/reset-password",
        element: <ResetPassword/>
    },
    {
        path: "/login-with-otp",
        element: <LoginWithOtp/>
    }
])
import express from "express"
import { checkUsernameAvailability, forgotPasswordController, loginUserController, otpVerificationController, registerUserController, resetPasswordController, sendOtpController } from "../controller/user.controller.js";
import authVerifyMiddleware from "../middlewares/authVerifyMiddleware.js";
export const authRouter = express.Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController); 
authRouter.post("/send-otp", sendOtpController);
authRouter.post("/otp-verification", otpVerificationController);
authRouter.post("/forgot-password", forgotPasswordController);
authRouter.put("/reset-password", resetPasswordController);
authRouter.post('/check-username-availability', checkUsernameAvailability);


authRouter.get("/verify-auth", authVerifyMiddleware, (req, res) => {
    res.json({
        message: "User is authenticated",
        user: {
            id: req.userId,
            // email: req.user.email,
        },
    });
});
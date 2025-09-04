import express from "express"
import { forgotPasswordController, loginUserController, otpVerificationController, registerUserController, resetPasswordController, sendOtpController } from "../controller/user.controller.js";
export const authRouter = express.Router();

authRouter.post("/register",registerUserController);
authRouter.post("/login",loginUserController);
authRouter.post("/send-otp",sendOtpController);
authRouter.post("/otp-verification",otpVerificationController);
authRouter.post("/forgot-password",forgotPasswordController);
authRouter.put("/reset-password",resetPasswordController);
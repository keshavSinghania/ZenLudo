import express from "express"
import { loginUserController, otpVerificationController, registerUserController, sendOtpController } from "../controller/user.controller.js";
export const authRouter = express.Router();

authRouter.post("/register",registerUserController);
authRouter.post("/login",loginUserController);
authRouter.post("/send-otp",sendOtpController);
authRouter.post("/otp-verification",otpVerificationController);
import express from "express";
import authVerifyMiddleware from "../middlewares/authVerifyMiddleware.js";
import { fetchConversationController, sendMessageController } from "../controller/message.controller.js";
export const messageRouter = express.Router();

messageRouter.get("/fetch-conversation/:friendId",authVerifyMiddleware, fetchConversationController);
messageRouter.post("/send-message",authVerifyMiddleware,sendMessageController);
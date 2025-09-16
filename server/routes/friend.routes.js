import express from "express";
import { searchFriendController, sendFriendRequestController } from "../controller/friend.controller.js";
import authVerifyMiddleware from "../middlewares/authVerifyMiddleware.js";

export const friendRouter  = express.Router();

friendRouter.post('/search-friend',authVerifyMiddleware,searchFriendController);
friendRouter.post('/send-friend-request', authVerifyMiddleware, sendFriendRequestController);
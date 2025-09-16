import express from "express";
import { acceptFriendRequestController, fetchFriendRequestsController, searchFriendController, sendFriendRequestController } from "../controller/friend.controller.js";
import authVerifyMiddleware from "../middlewares/authVerifyMiddleware.js";

export const friendRouter  = express.Router();

friendRouter.post('/search-friend',authVerifyMiddleware,searchFriendController);
friendRouter.post('/send-friend-request', authVerifyMiddleware, sendFriendRequestController);
friendRouter.get('/fetch-friend-requests', authVerifyMiddleware, fetchFriendRequestsController);
friendRouter.post('/accept-friend-request',authVerifyMiddleware, acceptFriendRequestController);
friendRouter.post('/reject-friend-request',authVerifyMiddleware, acceptFriendRequestController);
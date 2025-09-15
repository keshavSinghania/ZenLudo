import express from "express";
import { searchFriendController } from "../controller/friend.controller.js";

export const friendRouter  = express.Router();

friendRouter.post('/search-friend',searchFriendController);
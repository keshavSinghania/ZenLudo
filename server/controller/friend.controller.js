import Message from "../models/message.schema.js";
import User from "../models/user.schema.js";

// Search Friend
export const searchFriendController = async (req, res, next) => {
    try {
        const { friendUsername } = req.body;
        const userId = req.userId;

        // Fix: Check if user is logged in
        if (!userId) {
            const error = new Error("Auth required, Please login again");
            error.statusCode = 402;
            return next(error);
        }

        if (!friendUsername) {
            const error = new Error("Friend username is required");
            error.statusCode = 400;
            return next(error);
        }

        const friend = await User.findOne({ username: friendUsername }).select(
            "-password -email -otp"
        );

        if (!friend) {
            const error = new Error("No user with this username exists!");
            error.statusCode = 404;
            return next(error);
        }

        if (friend._id.toString() === userId.toString()) {
            const error = new Error("You can't search your own account");
            error.statusCode = 402;
            return next(error);
        }

        const friendInformation = {
            _id: friend._id || "NaN",
            name: friend.name || "NaN",
            username: friend.username || "NaN",
            profilePic: friend.profilePic || "NaN",
            gamesPlayed: friend.gamesPlayed ?? 0,
            gamesWon: friend.gamesWon ?? 0,
            firstPlaceWins: friend.firstPlaceWins ?? 0,
            recentGames: Array.isArray(friend.recentGames) ? friend.recentGames : [],
        };

        return res.status(200).json({
            message: "User found successfully",
            success: true,
            error: false,
            friendInformation,
        });
    } catch (error) {
        next(error);
    }
};

//Send Friend Request
export const sendFriendRequestController = async (req, res, next) => {
    try {
        const { friendId } = req.body;
        const userId = req.userId;

        if (!userId || !friendId) {
            const error = new Error("Invalid request");
            error.statusCode = 400;
            return next(error);
        }

        if (userId === friendId) {
            const error = new Error("Cannot send request to yourself");
            error.statusCode = 400;
            return next(error);
        }

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        if (user.friendIds.includes(friend._id)) {
            const error = new Error("Already friends");
            error.statusCode = 409;
            return next(error);
        }

        if (friend.friendRequests.includes(user._id)) {
            const error = new Error("Friend request already sent");
            error.statusCode = 409;
            return next(error);
        }

        friend.friendRequests.push(user._id);
        await friend.save();

        return res.status(200).json({
            message: "Friend request sent successfully",
            success: true,
            error: false,
        });
    } catch (error) {
        next(error);
    }
};

//Fetch Friend Requests
export const fetchFriendRequestsController = async (req, res, next) => {
    try {
        const userId = req.userId;
        if (!userId) {
            const error = new Error("Auth error. Please login again.");
            error.statusCode = 401;
            return next(error);
        }

        const user = await User.findById(userId)
            .select("-password -email -otp")
            .populate("friendRequests", "_id name username profilePic");

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        return res.status(200).json({
            message: "Successfully fetched all friend requests",
            error: false,
            success: true,
            friendRequests: user.friendRequests,
        });
    } catch (error) {
        next(error);
    }
};

//Fetch Friends (with little bit information including first 10 chats)
export const fetchFriendsController = async (req, res, next) => {
    try {
        const userId = req.userId;

        if (!userId) {
            const error = new Error("Auth error! Please login first");
            error.statusCode = 401;
            return next(error);
        }

        const user = await User.findById(userId)
            .select("-password -otp -email")
            .populate({
                path: "friendIds",
                select: "profilePic username name" 
            })
            .lean();

        if (!user) {
            const error = new Error("No such user found. Please register first");
            error.statusCode = 404;
            return next(error);
        }

        const friendsMessages = await Promise.all(
            user.friendIds.map(async (friend) => {
                const message = await Message.find({
                    $or: [
                        { sender: userId, receiver: friend._id },
                        { sender: friend._id, receiver: userId }
                    ]
                })
                    .sort({ createdAt: -1 })
                    .limit(1)
                    .select("sender text receiver createdAt")
                    .lean();

                return {
                    ...friend,
                    lastMessage: message,
                };
            })
        );

        return res.status(200).json({
            message: "Successfully fetched all friends",
            success: true,
            error: false,
            data: friendsMessages,
        });
    } catch (err) {
        const error = new Error(err.message || "Something went wrong");
        error.statusCode = err.statusCode || 500;
        next(error);
    }
};

//Accept Friend Request
export const acceptFriendRequestController = async (req, res, next) => {
    try {
        const { friendId } = req.body;
        const userId = req.userId;

        if (!friendId) {
            const error = new Error("Friend ID is required");
            error.statusCode = 400;
            return next(error);
        }

        const user = await User.findById(userId).select("friendIds friendRequests");
        const friend = await User.findById(friendId).select("friendIds");

        if (!user || !friend) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        if (!user.friendRequests.includes(friend._id)) {
            const error = new Error("No pending friend request from this user");
            error.statusCode = 400;
            return next(error);
        }

        if (user.friendIds.includes(friend._id)) {
            const error = new Error("Already friends");
            error.statusCode = 409;
            return next(error);
        }

        user.friendIds.push(friend._id);
        friend.friendIds.push(user._id);

        // Remove friend request
        user.friendRequests = user.friendRequests.filter(
            id => id.toString() !== friend._id.toString()
        );

        await user.save();
        await friend.save();

        return res.status(200).json({
            message: "Friend request accepted successfully",
            success: true,
            error: false,
        });
    } catch (error) {
        next(error);
    }
};

//Reject Friend Request
export const rejectFriendRequestController = async (req, res, next) => {
    try {
        const { friendId } = req.body;
        const userId = req.userId;

        if (!friendId) {
            const error = new Error("Friend ID is required");
            error.statusCode = 400;
            return next(error);
        }

        const user = await User.findById(userId).select("friendRequests");
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        if (!user.friendRequests.includes(friendId)) {
            const error = new Error("No pending friend request from this user");
            error.statusCode = 400;
            return next(error);
        }

        // Remove friend request
        user.friendRequests = user.friendRequests.filter(
            id => id.toString() !== friendId.toString()
        );
        await user.save();

        return res.status(200).json({
            message: "Friend request rejected successfully",
            success: true,
            error: false,
        });
    } catch (error) {
        next(error);
    }
};

//Remove Friend
export const removeFriendController = async (req, res, next) => {
    try {
        const { friendId } = req.body;
        const userId = req.userId;

        if (!friendId) {
            const error = new Error("Friend ID is required");
            error.statusCode = 400;
            return next(error);
        }

        const user = await User.findById(userId).select("friendIds");
        const friend = await User.findById(friendId).select("friendIds");

        if (!user || !friend) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        // Check if they are actually friends
        if (!user.friendIds.includes(friend._id)) {
            const error = new Error("You are not friends with this user");
            error.statusCode = 400;
            return next(error);
        }

        // Remove friend from both sides
        user.friendIds = user.friendIds.filter(id => id.toString() !== friend._id.toString());
        friend.friendIds = friend.friendIds.filter(id => id.toString() !== user._id.toString());

        await user.save();
        await friend.save();

        return res.status(200).json({
            message: "Friend removed successfully",
            success: true,
            error: false,
        });
    } catch (error) {
        next(error);
    }
};


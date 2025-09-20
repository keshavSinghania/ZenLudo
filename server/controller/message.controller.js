import Message from "../models/message.schema.js";
import User from "../models/user.schema.js";

// FUNCTION TO SEND MESSAGE
export const sendMessageController = async (req, res, next) => {
    try {
        const { receiverId, text } = req.body;
        const userId = req.userId;

        if (!receiverId || !text) {
            const error = new Error("Text and Receiver ID are required!");
            error.statusCode = 400;
            return next(error);
        }

        const receiver = await User.findById(receiverId)
            .select("_id name username profilePic")
            .lean();

        if (!receiver) {
            const error = new Error("Message receiver not found!");
            error.statusCode = 404;
            return next(error);
        }

        const savedMessage = await Message.create({
            receiver: receiverId,
            sender: userId,
            text,
        });

        if (!savedMessage) {
            const error = new Error("Something went wrong while saving message");
            error.statusCode = 500;
            return next(error);
        }

        return res.status(201).json({
            message: "Message sent successfully",
            success: true,
            error: false,
            data: savedMessage,
        });
    } catch (error) {
        next(error);
    }
};

// FUNCTION TO FETCH MESSAGE (LIMITED MESSAGE AT A TIME)
export const fetchConversationController = async (req, res, next) => {
    try {
        const { friendId } = req.params;
        const userId = req.userId;
        const limit = parseInt(req.query.limit) || 10;
        const skip = parseInt(req.query.skip) || 0;

        if (!friendId) {
            const error = new Error("Friend ID is required!");
            error.statusCode = 400;
            return next(error);
        }

        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: friendId },
                { senderId: friendId, receiverId: userId }
            ]
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

        if (!messages) {
            const error = new Error("Something went wrong while loading your chat");
            error.statusCode = 500;
            return next(error);
        }

        return res.status(200).json({
            message: "Conversation loaded",
            error: false,
            success: true,
            data: messages.reverse()
        });
    } catch (error) {
        next(error);
    }
};

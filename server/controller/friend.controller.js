import User from "../models/user.schema.js";


//controller to search friend using username 
export const searchFriendController = async(req, res, next) => {
    try {
        const {friendUsername } = req.body;
        if(!friendUsername){
            const error = new Error("friend username must required");
            error.statusCode = 400;
            return next(error);
        }

        const friend = await User.findOne({username:  friendUsername}).select('-password -email -googleId -otp ');
        if(!friend){
            const error = new Error("No user with this username exists!");
            error.statusCode = 404;
            return next(error);
        };

        const friendInformation = {
            name: friend.name,
            username : friend.username,
            profilePic : friend.profilePic,
            gamesPlayed : friend.gamesPlayed,
            gamesWon : friend.gamesWon,
            firstPlaceWins : friend.firstPlaceWins,
            recentGames : friend.recentGames,
        }
        return res.status(200).json({
            message: "User found successfully",
            success : true,
            error: false,
            friendInformation
        })
    } catch (error) {
        next(error);
    }
}
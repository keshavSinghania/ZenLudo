import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function() { return !this.googleId;}
    },
    googleId: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        default: ""
    },
    otpExpires: {
        type: Date,
    },
    lastLogin:{
        type: Date,
    },
    friendIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    friendRequests: [{
        from: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    }],
    gamesPlayed: {
        type: Number,
        default: 0,
    },
    gamesWon: {
        type: Number,
        default: 0,
    },
    firstPlaceWins: {
        type: Number,
        default: 0,
    },
    recentGames: [{
        gameId: mongoose.Schema.Types.ObjectId,
        result: String,
        date: Date,
    }],
    roomsCreatedToday: {
        type: Number,
        default: 0,
    },
    currentRoomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
    },
    roomInviteCoolDown: {
        type: Date,
    },
    diceTheme: {
        type: String,
        default: "default",
    },
    boardTheme: {
        type: String,
        default: "default",
    },
    resetPasswordToken: {
        type: String,
        default: null,
    },
    resetPasswordTokenExpires: {
        type: Date,
        default:null,
    }

    //notification ans voice chat later on
}, {
    timestamps: true,
});

export default mongoose.model("User", userSchema);
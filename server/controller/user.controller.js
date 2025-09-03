import User from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendOtpMail from "../utils/sendOtpMail.js";

// Generate JWT Token
const generateToken = (user) =>
  jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );

// REGISTER 
export const registerUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password required!");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email already exists!");
      error.statusCode = 409;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: "new_user",
      email,
      password: hashedPassword,
      verified: false,
    });

    return res.status(201).json({
      message: "Registered successfully. Verify your account via OTP.",
      success: true,
      error: false,
      userId: user._id,
    });
  } catch (err) {
    next(err);
  }
};

// LOGIN 
export const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password required!");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found. Please sign up first.");
      error.statusCode = 404;
      return next(error);
    }

    if (!user.isVerified) {
      const error = new Error("Please verify your account first!");
      error.statusCode = 401;
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Incorrect password!");
      error.statusCode = 401;
      return next(error);
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful",
      success: true,
      error: false,
      token,
    });
  } catch (err) {
    next(err);
  }
};

// SEND OTP 
export const sendOtpController = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      const error = new Error("Email is required!");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found! Please register first.");
      error.statusCode = 404;
      return next(error);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    const mailSent = await sendOtpMail(user.email, otp);

    return res.status(200).json({
      message: "OTP sent successfully.",
      success: true,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

// VERIFY OTP 
export const otpVerificationController = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!otp || !email) {
      const error = new Error("Email and OTP are required!");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      return next(error);
    }

    if (!user.otp || user.otp !== otp) {
      const error = new Error("Invalid OTP!");
      error.statusCode = 400;
      return next(error);
    }

    if (Date.now() > user.otpExpires) {
      const error = new Error("OTP expired!");
      error.statusCode = 400;
      return next(error);
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = generateToken(user);

    return res.status(200).json({
      message: "Account verified successfully!",
      success: true,
      error: false,
      token,
    });
  } catch (err) {
    next(err);
  }
};

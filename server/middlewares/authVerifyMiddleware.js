import jwt from "jsonwebtoken";
import User from "../models/user.schema.js";

const authVerifyMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Token missing. Please login!");
      error.statusCode = 401;
      return next(error);
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      const error = new Error("Invalid token. Please relogin.");
      error.statusCode = 401;
      return next(error);
    }

    // Find user in DB
    const user = await User.findById(decoded.userId);
    if (!user) {
      const error = new Error("User account not found!");
      error.statusCode = 404;
      return next(error);
    }

    // Attach user to request and continue
    req.user = user;
    next();
  } catch (error) {
    // Handle token expiration or other errors
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

export default authVerifyMiddleware;

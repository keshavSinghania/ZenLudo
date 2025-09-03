
export const errorMiddleware = (err, req, res, next) => {
  console.error("Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong, please try again.";
  const data = err.data || undefined;

  // Handling network error
  if (err.name === "MongooseNetworkError") {
    res.status(503).json({
      message: "Network error. Please check your internet connection.",
      success: false,
      error: true,
    });
  } else {
    res.status(statusCode).json({
      message,
      success: false,
      error: true,
      data,
    });
  }
};

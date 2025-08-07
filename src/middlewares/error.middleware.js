const errorMiddleware = (err, req, res, next) => {
  try {
    const error = { ...err };
    error.message = err.message;
    console.error(err);
    if (err.name === "CastError") {
      const message = "Resource not found";
      error = new Error(message);
      error.status = 404;
    }
    if (err.code === 11000) {
      const message = "duplicate field value entered";
      error = new Error(message);
      error.status = 400;
    }
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.status = 400;
    }
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "server error",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = errorMiddleware;

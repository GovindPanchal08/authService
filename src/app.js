const express = require("express");
const app = express();
const authRoute = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const errorMiddleware = require("./middlewares/error.middleware");
const morgan = require("morgan");
const rateLimiteMiddleware = require("./middlewares/rateLimit.middleware");
const logger = require("./utils/logger");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
require("./config/passport");
// buitl-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const stream = {
  write: (message) => logger.http(message.trim()),
};
app.use(
  morgan("combined", {
    stream,
    skip: false,
  })
);
app.use(morgan("dev"));
// express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
//passport middlewares
app.use(passport.initialize());
app.use(passport.session());

// third-party middlewares
app.use(cookieParser());
app.use(helmet());

// custom middlewares
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(500).json({ error: err.message });
  }
  next();
});
app.use(rateLimiteMiddleware);
app.get("/", (req, res) => {
  res.send("Heyy This Is Auth Folder");
});
app.use("/api/v1/auth", authRoute);
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    error: {
      statusCode: 404,
    },
  });
});
app.use(errorMiddleware);

module.exports = app;

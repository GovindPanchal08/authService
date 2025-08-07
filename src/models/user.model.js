const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Enter a valid email address",
      ],
    },
    username: {
      type: String,
      required: [true, "UserName is Required"],
      minLength: [2, "Name must be at least 3 characters"],
      maxLength: [15, "Name must be under 15 characters"],
      trim: true,
    },
    password: {
      type: String,
      // Not required for OAuth users
      required: function () {
        return !this.provider || this.provider === "local";
      },
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // allows multiple users without googleId
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user", "guest"],
        message: "{VALUE} is not a valid role",
      },
      default: "user",
    },
    refreshToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      match: [/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

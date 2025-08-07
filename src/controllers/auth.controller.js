const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  generateEmailToken,
} = require("../utils/tokenGeneration");
const sendEmail = require("../utils/email");

async function registerController(req, res, next) {
  try {
    const { email, username, password } = req.body;
    const exuser = await userModel.findOne({ email });
    if (exuser) {
      return res.status(409).json({ message: "user already exists" });
    }
    const user = await userModel.create({
      email,
      username,
      password: await bcrypt.hash(password, 10),
    });
    const emailToken = generateEmailToken(user._id);
    const url = `http://localhost:3000/api/v1/auth/verify-email?token=${emailToken}`;
    await sendEmail(
      user.email,
      "Verify Email",
      `Click <a href="${url}">here</a> to verify your email`
    );
    res.status(201).json({
      message: "user created successfully || Kindly Verify your email pls",
    });
  } catch (error) {
    next(error);
  }
}
async function loginController(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({
      email,
    });
    if (!user) {
      return res.status(404).json({
        error: "no user found ",
      });
    }
    if (!user.isVerified) {
      return res.status(401).json({
        error: "Please verify your email before logging in.",
      });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(401).json({
        error: "InValid Creadentials",
      });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = await bcrypt.hash(refreshToken, 10);
    await user.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "user login successfully",
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
}
async function refreshToken(req, res, next) {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "Invalid Token" });
  try {
    const decode = jwt.verify(token, "refresh");
    const user = await userModel.findById({ _id: decode.id });
    if (!user || !(await bcrypt.compare(token, user.refreshToken))) {
      return res
        .status(403)
        .json({ message: "user Not Found || Invalid Token" });
    }
    const newaccessToken = generateAccessToken(user);
    const newrefreshToken = generateRefreshToken(user);
    user.refreshToken = await bcrypt.hash(newrefreshToken, 10);
    await user.save();
    res
      .cookie("refreshToken", newrefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ accessToken: newaccessToken });
  } catch (error) {
    next(error);
  }
}
async function logout(req, res) {
  const token = req.cookies.refreshToken;
  if (token) {
    const decode = jwt.verify(token, "refresh");
    await userModel.findByIdAndUpdate(decode.id, { refreshToken: null });
  }
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });
  res.status(204).json({ message: "logout successfull" });
}
async function emailVerification(req, res, next) {
  try {
    const { token } = req.query;
    const { userId } = jwt.verify(token, "email");

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ message: "Email already verified" });

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  registerController,
  loginController,
  refreshToken,
  logout,
  emailVerification,
};

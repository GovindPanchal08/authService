const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  refreshToken,
  logout,
  emailVerification,
} = require("../controllers/auth.controller");
const { body } = require("express-validator");
const validate = require("../middlewares/validate");
const { authorize } = require("../middlewares/auth.middleware");
const userModel = require("../models/user.model");
const authRole = require("../middlewares/role.middleware");
const uploads = require("../middlewares/upload.middleware");
const passport = require("passport");

router.post(
  "/signUp",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("username").isString().withMessage("Valid username required"),
    body("password").isLength({ min: 2 }).withMessage("Min 2 char password"),
  ],
  validate,
  registerController
);

router.post(
  "/signIn",
  // [
  //   body("email").isEmail().withMessage("Valid email required"),
  //   body("password").isLength({ min: 2 }).withMessage("Min 2 char password"),
  // ],
  // validate,
  loginController
);

router.get("/refresh", refreshToken);
router.post("/logout", logout);

// social login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      console.error("Passport error:", err);
      return res.status(500).json({ message: "Internal error", err });
    }
    if (!user) {
      return res.status(401).json({ message: "Login failed", info });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login session error", err });
      }
      return res.redirect("/")
    });
  })(req, res, next);
});

router.get("/verify-email", emailVerification);

router.get("/user/:id", authorize, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).select("-password -__v -_id");
    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/admin", authorize, authRole(["admin"]), (req, res) => {
  res.json({ message: `Admin area` });
});

router.post("/upload", uploads.single("file"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  res.status(200).json({
    success: true,
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
  });
});

module.exports = router;

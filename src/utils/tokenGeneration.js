const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, "access", {
    expiresIn: "15m",
  });
}
function generateRefreshToken(user) {
  return jwt.sign({ id: user._id }, "refresh", {
    expiresIn: "7d",
  });
}

function generateEmailToken(userId) {
  return jwt.sign({ userId }, "email", {
    expiresIn: "15m", // short expiry
  });
}
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateEmailToken,
};

const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authorize(req, res, next) {
  try {
    const authhead = req.headers.authorization;
    if (!authhead?.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Un-Authorize",
      });
    }
    const token = authhead.split(" ")[1];
    jwt.verify(token, "access", async (err, data) => {
      if (err) return res.status(403).json({ error: "invalid token" });
      const user = await userModel.findById({ _id: data.id });
      if (!user) {
        return res.status(401).json({
          error: "User Not Found",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
    return res.status(401).json({
      message: "invalid token",
    });
  }
}
module.exports = {
  authorize,
};

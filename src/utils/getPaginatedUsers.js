const userModel = require("../models/user.model");
const getPaginatedUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await userModel
    .find()
    .skip(skip)
    .limit(limit)
    .select("email username")
    .sort({ createdAt: -1 });
  const totalusers = await userModel.countDocuments();
  res.json({
    total: totalusers,
    page,
    pages: Math.ceil(totalusers / limit),
    users,
  });
};

module.exports = getPaginatedUsers;

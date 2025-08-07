const { validationResult } = require("express-validator");
const validate = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const singleErr = err.array();
    // console.log(singleErr)
    return res.status(400).json({ err: singleErr.map((e) => e.msg) });
  }
  next();
};

module.exports = validate;

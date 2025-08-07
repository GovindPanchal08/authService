const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + " - " + Math.round(Math.random()) * 1e9;
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + unique + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowdType = ["image/jpeg", "image/png"];
  if (allowdType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG images are allowed"), false);
  }
};

const uploads = multer({
  storage,
  limits: 5 * 1024 * 1024,
  fileFilter,
});

module.exports = uploads;

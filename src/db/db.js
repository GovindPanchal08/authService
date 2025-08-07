const mongoose = require("mongoose");

function ConnectDb() {
  mongoose
    .connect("mongodb://localhost:27017/cohort-backend")
    .then(() => {
      console.log("MONGODB CONNETED SUCCESSFULLY");
    })
    .catch((error) => {
      console.log(error.message);
    });
}
module.exports = ConnectDb;

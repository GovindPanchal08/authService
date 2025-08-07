require("dotenv").config();
const app = require("./src/app");
const ConnectDb = require("./src/db/db");
ConnectDb();
app.listen(3000, () => {
  console.log("http://localhost:3000");
});

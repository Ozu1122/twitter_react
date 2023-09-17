const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
require("dotenv").config();
mongoose
  .connect(process.env.MONGOURL).then(() => {
    console.log("DB接続中")
  })
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.get("/", (req, res) => {
  res.send("Hello update");
})

app.listen(PORT, () => console.log("server start"))

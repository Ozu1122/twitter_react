const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const path = require("path");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const uploadRoute = require("./routes/upload")

require("dotenv").config();
mongoose
  .connect(process.env.MONGOURL).then(() => {
    console.log("DB接続中")
  })
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);
app.get("/", (req, res) => {
  res.send("Hello update");
})

app.listen(PORT, () => console.log("server start"))

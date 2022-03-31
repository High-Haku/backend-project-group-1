const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
require("dotenv").config();

const {
  booksImageStorage,
  usersImageStorage,
  imageFilter,
} = require("./config/multerConfig");

const app = express();
const port = process.env.PORT || 3000;

const dbName = "backendProject";
const uri = `mongodb+srv://skilvul:skilvul123@cluster0.cydfw.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB Atlas Connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Middleware /////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/pages", express.static("pages"));
app.use("/public", express.static("public"));
/////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("Dokumentasi API");
});

const allRouter = require("./routes");
app.use(allRouter);

app.listen(port, () => {
  console.log("server running on port " + port);
});

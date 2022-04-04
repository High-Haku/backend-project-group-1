const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const dbName = "backendProject";
const uri = `mongodb+srv://${process.env.USER_PASSWORD}@cluster0.cydfw.mongodb.net/${dbName}?retryWrites=true&w=majority`;
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
app.use("/public", express.static("public"));
/////////////////////////////////////////////

app.get("/", (req, res) => {
  res.sendFile("/views/index.html", { root: __dirname });
});

const allRouter = require("./routes");
app.use(allRouter);

app.listen(port, () => {
  console.log("server running on port " + port);
});

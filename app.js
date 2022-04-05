const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB Atlas Connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Middleware /////////////
app.use(cors());
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

const express = require("express");
const router = express.Router();

const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.resolve("pages/index.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.resolve("pages/login.html"));
});

module.exports = router;

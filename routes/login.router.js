const express = require("express");
const router = express.Router();

const { showLoginPage, loginPage } = require("../controllers/login.controller");

router.get("/", showLoginPage);
router.post("/", loginPage);

module.exports = router;

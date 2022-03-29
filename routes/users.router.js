const express = require("express");
const router = express.Router();

const { getUsers, getUserByID, addUser } = require("../controllers/users.controller")

router.get("/", getUsers);
router.post("/", addUser);
router.get("/:id", getUserByID);

module.exports = router;
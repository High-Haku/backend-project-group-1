const express = require("express");
const router = express.Router();
const { requiresAdmin } = require("../verifyToken");

const {
  getUsers,
  getUserByID,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

router.post("/", addUser);

const { requiresAdmin } = require("../verifyToken");
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserByID);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserByID,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

router.get("/", getUsers);
router.post("/", addUser);
router.put("/", updateUser);
router.delete("/", deleteUser);
router.get("/:id", getUserByID);

module.exports = router;

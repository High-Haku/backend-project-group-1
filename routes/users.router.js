const express = require("express");
const router = express.Router();
const { requiresAdmin } = require("../config/verifyToken");
const { imageFilter, usersImageStorage } = require("../config/multerConfig");
const multer = require("multer");

const {
  getUsers,
  getUserByID,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

router.post(
  "/",
  multer({ storage: usersImageStorage, fileFilter: imageFilter }).single("img"),
  addUser
);

router.use(requiresAdmin);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserByID);

module.exports = router;

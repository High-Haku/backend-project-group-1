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
  multer({ storage: usersImageStorage, fileFilter: imageFilter }).single(
    "image"
  ),
  addUser
);

router.get("/:id", getUserByID);
router.put(
  "/:id",
  multer({ storage: usersImageStorage, fileFilter: imageFilter }).single(
    "image"
  ),
  updateUser
);

router.use(requiresAdmin);
router.get("/", getUsers);
router.delete("/:id", deleteUser);

module.exports = router;

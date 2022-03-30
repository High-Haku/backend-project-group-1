const express = require("express");
const { requiresAdmin } = require("../config/verifyToken");
const { booksImageStorage, imageFilter } = require("../config/multerConfig");
const multer = require("multer");

const router = express.Router();
const {
  getAllBooks,
  addBooks,
  updateBooks,
  deleteBooks,
  getById,
} = require("../controllers/books.controller");

router.get("/", getAllBooks);
router.get("/:id", getById);
// Requires Admin Login ////
router.use(requiresAdmin);
router.post(
  "/",
  multer({ storage: booksImageStorage, fileFilter: imageFilter }).single("img"),
  addBooks
);
router.put("/:id", updateBooks);
router.delete("/:id", deleteBooks);

module.exports = router;

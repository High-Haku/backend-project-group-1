const express = require("express");
const { requiresAdmin } = require("../verifyToken");

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
router.post("/", addBooks);
router.put("/:id", updateBooks);
router.delete("/:id", deleteBooks);

module.exports = router;

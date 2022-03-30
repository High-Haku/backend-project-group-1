const express = require("express");
const { requiresAdmin } = require("../verifyToken");

const router = express.Router();
const {
  getAllBooks,
  addBooks,
  updateBooks,
  deleteBooks,
} = require("../controllers/books.controller");

router.get("/", getAllBooks);

// require admin login ////
router.use(requiresAdmin);
router.post("/", addBooks);
router.put("/:id", updateBooks);
router.delete("/:id", deleteBooks);

module.exports = router;

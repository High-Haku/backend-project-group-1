const express = require("express");

const router = express.Router();
const { getAllBooks,addBooks,updateBooks,deleteBooks } = require("../controllers/books.controller");

router.get("/", getAllBooks)
router.post("/", addBooks)
router.put("/", updateBooks)
router.delete("/", deleteBooks)

module.exports = router;

const express = require("express");

const router = express.Router();
const { getAllBooks,addBooks,updateBooks,deleteBooks,getById } = require("../controllers/books.controller");

router.get("/", getAllBooks)
router.get("/:id", getById)
router.post("/", addBooks)
router.put("/:id", updateBooks)
router.delete("/:id", deleteBooks)

module.exports = router;

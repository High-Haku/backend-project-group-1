const express = require("express");

const router = express.Router();
const { getAllWriters, updateWriters, addWriters, deleteWriters,getWriterById} = require("../controllers/writer.controller")

router.get("/", getAllWriters)
router.get("/:id", getWriterById)
router.post("/", addWriters)
router.put("/:id", updateWriters)
router.delete("/:id", deleteWriters)

module.exports = router;
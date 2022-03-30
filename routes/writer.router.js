const express = require("express");

const router = express.Router();
const { getAllWriters, updateWriters, addWriters, deleteWriters,getWriterById} = require("../controllers/writer.controller");
const { requiresAdmin } = require("../config/verifyToken");

router.get("/", getAllWriters)
router.get("/:id", getWriterById)
router.use(requiresAdmin)
router.post("/", addWriters)
router.put("/:id", updateWriters)
router.delete("/:id", deleteWriters)

module.exports = router;
const express = require("express");
const {
  getData,
  addData,
  deleteData,
} = require("../controllers/transactions.controller");
const router = express.Router();

router.get("/", getData);
router.post("/", addData);
router.delete("/:id", deleteData);

module.exports = router;

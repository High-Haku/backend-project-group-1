const express = require("express");
const {
  getData,
  getById,
  addData,
  deleteData,
  updateTransactionsProses,
} = require("../controllers/transactions.controller");
const router = express.Router();

router.get("/", getData);
router.get("/:id", getById);
router.patch("/:id", updateTransactionsProses);
router.post("/", addData);
router.delete("/:id", deleteData);

module.exports = router;

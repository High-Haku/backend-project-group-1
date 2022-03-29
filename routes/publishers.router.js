const express = require("express");
const router = express.Router();

const {
  getPublishers,
  getPublisherByID,
  addPublisher,
  deletePublisher,
} = require("../controllers/publishers.controller");

router.get("/", getPublisher);
router.post("/", addPublisher);
router.delete("/", deletePublisher);
router.get("/:id", getPublisherByID);

module.exports = router;

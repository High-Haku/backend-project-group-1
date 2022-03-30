const express = require("express");
const router = express.Router();

const {
  getPublishers,
  getPublisherByID,
  addPublisher,
  updatePublisher,
  deletePublisher,
} = require("../controllers/publisher.controller");

router.get("/", getPublishers);
router.post("/", addPublisher);
router.put("/", updatePublisher)
router.delete("/", deletePublisher);
router.get("/:id", getPublisherByID);

module.exports = router;

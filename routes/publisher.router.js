const express = require("express");
const router = express.Router();
const { requiresAdmin } = require("../config/verifyToken");

const {
  getPublishers,
  getPublisherByID,
  addPublisher,
  updatePublisher,
  deletePublisher,
} = require("../controllers/publisher.controller");


router.get("/", getPublishers);
router.get("/:id", getPublisherByID);

router.use(requiresAdmin);
router.post("/", addPublisher);
router.put("/:id", updatePublisher)
router.delete("/:id", deletePublisher);

module.exports = router;

const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  books: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
  },
  location: {
    type: String,
    default: "",
  },
});

const PublisherModel = mongoose.model("publishers", publisherSchema);
module.exports = PublisherModel;

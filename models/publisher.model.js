const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  books: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
});

const PublisherModel = mongoose.model("publishers", publisherSchema);
module.exports = PublisherModel;

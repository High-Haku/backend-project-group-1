const mongoose = require("mongoose");

const publisherShcema = new mongoose.Schema({
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

const PublisherModel = mongoose.model("publishers", publisherShcema);
module.exports = PublisherModel;

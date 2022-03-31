const mongoose = require("mongoose");

const publisherShcema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
  }],
  location: {
    type: String,
  },
});

const PublisherModel = mongoose.model("publishers", UserShcema);
module.exports = PublisherModel;

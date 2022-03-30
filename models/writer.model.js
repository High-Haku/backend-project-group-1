const mongoose = require("mongoose");

const writerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  books: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
  },
});

const Writers = mongoose.model("writer", writerSchema, "writer");
module.exports = Writers;

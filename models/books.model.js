const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: "public\\images\\book.jpg",
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "writer",
    default: "",
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "publishers",
    default: "",
  },

  description: {
    type: String,
    default: "",
  },

  price: {
    type: Number,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },

  releaseDate: {
    type: String,
    default: "",
  },
  genre: {
    type: String,
    required: true,
  },
});

const Books = mongoose.model("book", booksSchema, "book");
module.exports = Books;

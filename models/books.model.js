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
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "publishers",
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

// Update Relational Collection After Post
booksSchema.post("save", async (doc) => {
  const Publishers = require("./publisher.model");
  const Writers = require("./writer.model");

  try {
    if (doc.writer) {
      const writer = await Writers.findById(doc.writer);
      await Writers.updateOne(
        { _id: doc.writer },
        { books: [...writer.books, doc._id] }
      );
    }

    if (doc.publisher) {
      const publisher = await Publishers.findById(doc.publisher);
      await Publishers.updateOne(
        { _id: doc.publisher },
        { books: [...publisher.books, doc._id] }
      );
    }
  } catch (error) {
    console.log(error);
  }
});

booksSchema.post("deleteOne", { document: true, query: false }, async (doc) => {
  const Publishers = require("./publisher.model");
  const Writers = require("./writer.model");

  try {
    const targetId = doc._id;
    const writers = await Writers.find({ books: targetId });
    const publishers = await Publishers.find({ books: targetId });

    writers.forEach((writer) => {
      const newBooks = writer.books.filter((b) => {
        if (!b.equals(targetId)) {
          return b;
        }
      });
      writer.books = newBooks;
      writer.save();
    });

    publishers.forEach((publisher) => {
      const newBooks = publisher.books.filter((b) => {
        if (!b.equals(targetId)) {
          return b;
        }
      });
      publisher.books = newBooks;
      publisher.save();
    });
  } catch (error) {
    console.log(error);
  }
});

const Books = mongoose.model("book", booksSchema, "book");
module.exports = Books;

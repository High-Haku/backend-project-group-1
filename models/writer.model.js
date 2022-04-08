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

  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
  ],
});

writerSchema.post(
  "deleteOne",
  { document: true, query: false },
  async (doc) => {
    const Books = require("./books.model");
    try {
      const targetId = doc._id;
      await Books.updateMany({ writer: targetId }, { writer: null });
    } catch (error) {
      console.log(error);
    }
  }
);

const Writers = mongoose.model("writer", writerSchema, "writer");
module.exports = Writers;

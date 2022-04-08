const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
  ],
  location: {
    type: String,
    default: "",
  },
});

publisherSchema.post(
  "deleteOne",
  { document: true, query: false },
  async (doc) => {
    const Books = require("./books.model");
    try {
      const targetId = doc._id;
      await Books.updateMany({ publisher: targetId }, { publisher: null });
    } catch (error) {
      console.log(error);
    }
  }
);

const PublisherModel = mongoose.model("publishers", publisherSchema);
module.exports = PublisherModel;

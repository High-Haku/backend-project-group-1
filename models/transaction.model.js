const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
});

const Transactions = mongoose.model("transaction", transactionSchema);
module.exports = Transactions;
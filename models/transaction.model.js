const mongoose = require("mongoose");
const moment = require("moment");

const transactionSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
      ref: "book",
=======
      ref: "Books",
      required: true,
>>>>>>> 039f8096756549a35db83f98e2a60272c2c4c69f
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["proses", "done", "canceled", "pending", "sending"],
    required: true,
  },
  purchaseDate: {
    type: String,
    default: moment().format("DD-MM-YYYY"),
  },
});

const Transactions = mongoose.model("transaction", transactionSchema);
module.exports = Transactions;

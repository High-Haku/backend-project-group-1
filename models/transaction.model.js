const mongoose = require("mongoose");
const moment = require("moment");

const transactionSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,

      ref: "book",
      required: true,

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

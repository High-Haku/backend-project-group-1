const mongoose = require("mongoose");
const moment = require("moment");

const Users = require("./user.model");

const transactionSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
  ],
  orderBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  totalPrice: {
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

// Adding User Transactions History
transactionSchema.post("save", async (doc) => {
  try {
    const user = await Users.findById(doc.orderBy);
    await Users.updateOne(
      { _id: doc.orderBy },
      { purchaseHistory: [...user.purchaseHistory, doc._id] }
    );
  } catch (error) {
    console.log(error);
  }
});

const Transactions = mongoose.model("transaction", transactionSchema);
module.exports = Transactions;

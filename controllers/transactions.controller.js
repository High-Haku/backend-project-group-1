const Books = require("../models/books.model");
const Transactions = require("../models/transaction.model");

const getData = async (req, res) => {
  try {
    const data = await Transactions.find({}, "-__v")
      .populate("orderBy", "name")
      .populate("products", "title price img");
    res.json({
      msg: "success",
      err: null,
      data,
    });
  } catch (error) {
    console.log(error), res.status(500).send(error);
  }
};

const getById = async (req, res) => {
  try {
    const data = await Transactions.findById(req.params.id).populate(
      "products",
      "title price img"
    );

    res.json({
      msg: "success",
      err: null,
      data,
    });
  } catch (error) {
    console.log(error), res.status(500).send(error);
  }
};

const addData = async (req, res) => {
  const data = new Transactions(req.body);

  // Calculate Total Price
  const book = await Books.find({ _id: req.body.products });
  let totalPrice = 0;
  book.forEach((b) => (totalPrice += b.price));
  data.totalPrice = totalPrice;
  //////////////////////////

  data
    .save()
    .then((data) => {
      res.json({
        msg: "transaction success",
        err: null,
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
      res.json({
        msg: "transaction failed",
        err,
        data: null,
      });
    });
};

const updateTransactionsProses = async (req, res) => {
  try {
    await Transactions.updateOne(
      { _id: req.params.id },
      { status: req.body.status },
      { runValidators: true }
    ),
      res.json({
        message: "Proses has been updated",
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteData = async (req, res) => {
  const data = await Transactions.findById(req.params.id).catch((err) => err);
  console.log(data);
  Transactions.deleteOne({ _id: req.params.id })
    .then(() => {
      if (data === null)
        return res.status(404).json({
          msg: "delete failed",
          err: "data already deleted",
          data,
        });

      res.json({
        msg: "delete success",
        err: null,
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
      res.json({
        msg: "delete failed",
        err,
        data: null,
      });
    });
};

module.exports = {
  getData,
  getById,
  addData,
  deleteData,
  updateTransactionsProses,
};

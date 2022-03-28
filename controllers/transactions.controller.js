const Transactions = require("../models/transaction.model");

const getData = async (req, res) => {
  const data = await Transactions.find();
  res.json({
    msg: "success",
    err: null,
    data,
  });
};

const addData = (req, res) => {
  const data = new Transactions(req.body);
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

module.exports = { getData, addData, deleteData };

const PublisherModel = require("../models/user.model");

module.exports = {
  getPublishers: async (req, res) => {
    const users = await PublisherModel.find();
    console.log(users);

    try {
      res.json({
        message: "Get users data success",
        data: users,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  getPublisherByID: async (req, res) => {
    const users = await PublisherModel.findById(req.params.id);
    try {
      res.json({
        message: "Get data user success",
        data: users,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  addPublisher: async (req, res) => {
    const data = req.body;

    try {
      await PublisherModel.create(data);
      res.json({
        message: "Input data success",
        data: 1,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  deletePublisher: async (req, res) => {
    const data = await PublisherModel.findById(req.params.id).catch((err) => err);
    console.log(data);

    PublisherModel.deleteOne({ _id: req.params.id })
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
  }
};

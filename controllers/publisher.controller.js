const PublisherModel = require("../models/user.model");

module.exports = {
  getPublishers: async (req, res) => {
    const publishers = await PublisherModel.find({}).populate(
      "books",
      "title img"
    );

    try {
      res.json({
        message: "Get publishers data success",
        data: publishers,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getPublisherByID: async (req, res) => {
    const publishers = await PublisherModel.findById(req.params.id).populate(
      "books",
      "title img"
    );

    try {
      res.json({
        message: "Get publisher data success",
        data: publishers,
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

  updatePublisher: async (req, res) => {
    const publishers = await PublisherModel.findById(req.params.id, "-__v");
    const data = req.body;

    try {
      await PublisherModel.updateOne({ _id: req.params.id }, data),
        res.json({
          message: "Data has been updated",
        });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  deletePublisher: async (req, res) => {
    const publishers = await PublisherModel.findById(req.params.id, "-__v");

    try {
      await PublisherModel.deleteOne({ _id: req.params.id });
      res.json({
        message: "Data has been deleted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};

const UserModel = require("../models/user.model");

module.exports = {
  getUsers: async (req, res) => {
    const users = await UserModel.find();
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

  getUserByID: async (req, res) => {
    const users = await UserModel.findById(req.params.id);

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

  addUser: async (req, res) => {
    let data = req.body;
    data = { ...data, photo: req.file.path };

    try {
      await UserModel.create(data);
      res.json({
        message: "Input data success",
        data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  updateUser: async (req, res) => {
    const users = await UserModel.findById(req.params.id, "-__v");
    const data = req.body;

    try {
      await UserModel.replaceOne({ _id: req.params.id }, data),
        res.json({
          message: "Data has been updated",
        });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  deleteUser: async (req, res) => {
    const users = await UserModel.findById(req.params.id, "-__v");

    try {
      await UserModel.deleteOne({ _id: req.params.id });
      res.json({
        message: "Data has been deleted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};

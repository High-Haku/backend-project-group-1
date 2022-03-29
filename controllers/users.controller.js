const UserModel = require("../models/user.model");

module.exports = {
  getUsers: async (req, res) => {
    const users = await UserModel.find();

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
    const data = req.body;

    try {
      await UserModel.create(data);
      res.json({
        message: "Input data success",
        data: 1,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};

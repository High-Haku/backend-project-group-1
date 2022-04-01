const UserModel = require("../models/user.model");
const validator = require("validator");

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
    const users = await UserModel.findById(req.params.id)
    .populate({
      path: "purchaseHistory",
      populate: { path: "products", select: "title price img" },
    })
    .populate("wishlist" , "title img price")
    
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
    try {
      let data = req.body;
      if (req.file) data = { ...data, image: req.file.path };

      if (!validator.isEmail(req.body.email))
        return res.status(400).json({ messege: "email not valid" });

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
    const data = req.body;
    if (req.file) data = { ...data, image: req.file.path };

    //check email
    if (req.body.email) {
      if (!validator.isEmail(req.body.email))
        return res.status(400).json({ messege: "email not valid" });
    }

    try {
      await UserModel.updateOne({ _id: req.params.id }, data),
        res.json({
          message: "Data has been updated",
          data,
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
      res.status(400).send(error);
    }
  },
};

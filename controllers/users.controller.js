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

    updateUser: async (req, res) => {
      const data = await UserModel.findById(req.params.id).catch((err) => err);
      console.log(data);
  
      UserModel.updateOne({ _id: req.params.id })
        .then(() => {
          if (data === null)
            return res.status(404).json({
              msg: "update failed",
              err: "data already up to date",
              data,
            });
    
          res.json({
            msg: "update success",
            err: null,
            data,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400);
          res.json({
            msg: "update failed",
            err,
            data: null,
          });
        });
    },

    deleteUser: async (req, res) => {
      const data = await UserModel.findById(req.params.id).catch((err) => err);
      console.log(data);
  
      UserModel.deleteOne({ _id: req.params.id })
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
}
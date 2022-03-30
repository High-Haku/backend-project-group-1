const mongoose = require("mongoose");

const UserShcema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    require: true,
  }
});

const UserModel = mongoose.model("users", UserShcema);
module.exports = UserModel;

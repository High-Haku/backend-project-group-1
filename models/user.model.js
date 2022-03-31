const mongoose = require("mongoose");

const UserShcema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  image: {
    type: String,
    default: "public\\images\\profile.png",
  },
});

const UserModel = mongoose.model("users", UserShcema);
module.exports = UserModel;

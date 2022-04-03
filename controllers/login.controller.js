const path = require("path");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const showLoginPage = (req, res) => {
  res.sendFile(path.resolve("views/login.html"));
};

const loginPage = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).catch(
      (err) => {
        res.status(500).json({ msg: "server error", err });
      }
    );

    const isPasswordRight = await bcrypt
      .compare(req.body.password, user.password)
      .catch((err) => console.log(err));

    if (req.body.email === user.email && isPasswordRight) {
      const accessToken = jwt.sign(
        { name: user.name, role: user.role, id: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.cookie("cookie", accessToken, {
        maxAge: 15 * 60 * 1000,
      });
      return res.json({
        msg: "login successful",
        redirect: "/views",
        token: accessToken,
        id: user.id,
      });
    }

    res.status(400).json({ msg: "username / password invalid" });
  } catch (error) {
    res.status(404).json({ msg: "username not found", error });
  }
};

module.exports = { showLoginPage, loginPage };

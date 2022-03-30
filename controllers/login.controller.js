const path = require("path");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const showLoginPage = (req, res) => {
  res.sendFile(path.resolve("pages/login.html"));
};

const loginPage = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).catch(
      (err) => {
        res.status(500).json({ msg: "server error", err });
      }
    );

    if (req.body.email === user.email && req.body.password === user.password) {
      const accessToken = jwt.sign(
        { name: user.name, role: user.role },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.json({
        msg: "login successful",
        redirect: "/page",
        token: accessToken,
      });
    }

    res.status(400).json({ msg: "username / password invalid" });
  } catch (error) {
    res.status(404).json({ msg: "username not found", error });
  }
};

module.exports = { showLoginPage, loginPage };

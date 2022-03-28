const express = require("express");
const router = express.Router();

const usersRouter = require("./users.route");
const booksRouter = require("./books.route");
const transactionsRouter = require("./transactions.route");

router.get("/", (req, res) => {
  res.json("ini dari server");
});

router.use("/users", usersRouter);
router.use("/books", booksRouter);
router.use("/transactions", transactionsRouter);

module.exports = router;

const express = require("express");
const router = express.Router();

const usersRouter = require("./users.router");
const booksRouter = require("./books.router");
const transactionsRouter = require("./transactions.router");
const pagesRouter = require("./pages.router");

router.get("/", (req, res) => {
  res.json("ini dari server");
});

router.use("/users", usersRouter);
router.use("/books", booksRouter);
router.use("/transactions", transactionsRouter);

router.use("/page", pagesRouter);

module.exports = router;

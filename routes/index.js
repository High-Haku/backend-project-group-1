const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../verifyToken");
const path = require("path");

const usersRouter = require("./users.router");
const booksRouter = require("./books.router");
const transactionsRouter = require("./transactions.router");
const writersRouter = require("./writer.router");
const publisherRouter = require("./publisher.router")

const loginRouter = require("./login.router");

router.use("/login", loginRouter);

// Login Access Only
router.use(authenticateJWT);
router.use("/users", usersRouter);
router.use("/books", booksRouter);
router.use("/writers", writersRouter);
router.use("/transactions", transactionsRouter);

router.get("/page", (req, res) => {
  res.sendFile(path.resolve("pages/index.html"));
});

module.exports = router;

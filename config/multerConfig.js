const multer = require("multer");

const booksImageStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images/books");
  },
  filename: (req, file, callback) => {
    callback(null, new Date().getTime() + "-" + file.originalname);
  },
});

const usersImageStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/images/users");
  },
  filename: (req, file, callback) => {
    callback(null, new Date().getTime() + "-" + file.originalname);
  },
});

const imageFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

module.exports = {
  booksImageStorage,
  usersImageStorage,
  imageFilter,
};

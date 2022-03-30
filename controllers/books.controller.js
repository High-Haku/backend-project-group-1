const Books = require("../models/books.model");

const getBookByQuery = async (query) => {
  const data = await Books.find({ $and: query }, "-__v");
  if (data.length === 1) return data[0];
  return data !== undefined ? data : false;
};

module.exports = {
  getAllBooks: async (req, res) => {
    // Search By Query ////////////////
    if (Object.keys(req.query).length !== 0) {
      const queryArray = [];
      for (query in req.query) {
        const queryName = query;
        const queryValue = req.query[query];
        const q = { [queryName]: queryValue };

        queryArray.push(q);
      }

      const book = await getBookByQuery(queryArray);
      console.log(book);
      if (book) return res.json(book);
    }
    /////////////////////////////////

    // Get All Books /////////////////
    try {
      const books = await Books.find({}, "-__v");
      res.json({
        message: "berhasil menampilkan semua buku",
        data: books,
      });
    } catch (error) {
      console.log(error), res.status(500).send(error);
    }
  },
  addBooks: async (req, res) => {
    const data = req.body;
    data.img = req.file.path;

    try {
      await Books.create(data);
      res.json({
        message: "berhasil input data",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getById: async (req, res) => {
    const books = await Books.findById(req.params.id, "-__v");

    try {
      res.json({
        message: "menampilkan buku sesuai ID",
        data: books,
      });
    } catch (error) {
      console.log(error), res.status(500).send(error);
    }
  },
  updateBooks: async (req, res) => {
    const books = await Books.findById(req.params.id, "-__v");
    const data = req.body;
    try {
      await Books.replaceOne({ _id: req.params.id }, data),
        res.json({
          message: "Data has been updated",
        });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  deleteBooks: async (req, res) => {
    const books = await Books.findById(req.params.id, "-__v");
    try {
      await Books.deleteOne({ _id: req.params.id });
      res.json({
        message: "Data has been deleted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};

const Books = require("../models/books.model");

const getBookByQuery = async (query) => {
  const data = await Books.find({ $and: query }, "-__v")
    .populate("publisher", "name -_id")
    .populate("writer", "name -_id");

  if (data.length === 1) return data[0];
  return data !== undefined ? data : false;
};

const searchBookByQuery = async (queries) => {
  const queryArray = [];
  for (query in queries) {
    const queryName = query.toLowerCase();
    let queryValue =
      typeof queries[query] === "string"
        ? queries[query].toLowerCase()
        : queries[query];

    // Check Query Value
    if (isNaN(queryValue)) {
      switch (queryName) {
        case "stock":
        case "price":
        case "maxprice":
        case "minprice":
        case "maxstock":
        case "minstock":
          queryValue = 0;
      }
    }

    let q = {};
    if (queryName === "minstock" || queryName === "minprice") {
      const newQueryName = queryName === "minstock" ? "stock" : "price";
      q = { [newQueryName]: { $gte: queryValue } };
    } else if (queryName === "maxstock" || queryName === "maxprice") {
      const newQueryName = queryName === "maxstock" ? "stock" : "price";
      q = { [newQueryName]: { $lte: queryValue } };
    } else if (queryName === "price" || queryName === "stock") {
      q = { [queryName]: queryValue };
      // } else if (queryName === "publisher" || queryName === "writer") {
      //   const regex = new RegExp(`.*${queryValue}.*`, "gi");
      //   q = { [queryName + "Name"]: { $regex: regex } };
    } else {
      const regex = new RegExp(`.*${queryValue}.*`, "gi");
      q = { [queryName]: { $regex: regex } };
    }

    queryArray.push(q);
  }
  return queryArray;
};

module.exports = {
  getAllBooks: async (req, res) => {
    try {
      // Search By Query ////////////////
      if (Object.keys(req.query).length !== 0) {
        const queryArray = await searchBookByQuery(req.query);
        const book = await getBookByQuery(queryArray);
        if (book) return res.json(book);
      }

      // Get All Books /////////////////
      const books = await Books.find({}, "-__v")
        .populate("publisher", "name -_id")
        .populate("writer", "name -_id");
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
    if (req.file) data.img = req.file.path;

    try {
      await Books.create(data);
      res.json({
        message: "berhasil input data",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  getById: async (req, res) => {
    const books = await Books.findById(req.params.id, "-__v")
      .populate("publisher", "name -_id")
      .populate("writer", "name -_id");

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
    const data = req.body;
    if (req.file) data.img = req.file.path;
    try {
      await Books.updateOne({ _id: req.params.id }, data),
        res.json({
          message: "Data has been updated",
          data,
        });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  deleteBooks: async (req, res) => {
    try {
      const book = await Books.findById(req.params.id);
      book.deleteOne();
      res.json({
        message: "Data has been deleted",
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};

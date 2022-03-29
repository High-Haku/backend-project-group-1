const mongoose = require("mongoose")

const booksSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    img:{
        type: String,
        require: true,
    },
    // writer:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Writers",
    //     require: true,
    // },

    // publisher:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Publishers",
    //     require: true,
    // },

    description:{
        type: String,
    },

    price:{
        type: Number,
        require: true,
    },

    stock:{
        type: Number,
        require: true,
    },

    date:{
        type: Date,
        require: true,
    },
    genre:{
        type: String,
        require: true,
    }
})

const Books = mongoose.model("book",booksSchema,"book");
module.exports = Books
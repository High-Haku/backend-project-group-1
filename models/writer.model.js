const mongoose = require("mongoose")

const writerSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    dateOfBirth:{
        type: Date
    },
    location:{
        type: String
    },
    books:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "book"
    }
})

const Writers = mongoose.model("writer", writerSchema,"writer")
module.exports = Writers
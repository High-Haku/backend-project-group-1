const Books = require("../models/books.model")

module.exports = {
    getAllBooks: async (req,res) => {
        const books = await Books.find({}, "-__V")

        try{
            res.json({
                message: "berhasil menampilkan semua buku",
                data: books,
            })
        } catch(error){
            console.log(error),
            res.status(500).send(error)
        }
    },
    addBooks: async (req,res) =>{
        const data = req.body

        try{
            await Books.create(data)
            res.json({
                message: 'berhasil input data',
                data: 1,
            })
        } catch(error){
            console.log(error)
            res.status(500).send(error)
        }
    },
    updateBooks: async(req, res)=>{
        const books = await Books.find({}, "-__V")
        const data = req.body

        try{
            await Books.splice()
        }catch(error){
            console.log(error)
            res.status(500).send(error)
        }
    },
    deleteBooks: async(req,res)=>{
        const books = await Books.find({}, "-__V")

        try{
            await Books.splice()
        }catch(error){
            console.log(error)
            res.status(500).send(error)
        }
    }
}
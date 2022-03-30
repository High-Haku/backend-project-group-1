const Books = require("../models/books.model")

module.exports = {
    getAllBooks: async (req,res) => {
        const books = await Books.find({}, "-__v")

        try{
            res.json({
                message: "menampilkan semua buku",
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
    getById: async (req,res) =>{
        const books = await Books.findById((req.params.id), "-__v")

        try{
            res.json({
                message: "menampilkan buku sesuai ID",
                data: books,
            })
        } catch(error){
            console.log(error),
            res.status(500).send(error)
        }
    },
    updateBooks: async(req, res)=>{
        const books = await Books.findById((req.params.id), "-__v")
        const data = req.body
        try{
            await Books.replaceOne({_id: req.params.id}, data), 
            res.json({
                message: "Data has been updated"
            })
        }catch(error){
            console.log(error)
            res.status(500).send(error)
        }
    },
    deleteBooks: async(req,res)=>{
        const books = await Books.findById((req.params.id), "-__v")
        try{
            await Books.deleteOne({_id: req.params.id})
            res.json({
                message: "Data has been deleted"
            })
        }catch(error){
            console.log(error)
            res.status(500).send(error)
        }
    }
}


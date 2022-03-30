const Writers = require("../models/writer.model")

module.exports = {
    getAllWriters: async (req,res) => {
        const allWriter = await Writers.find({})
        .populate("books")

        try{
            res.json({
                message: "berhasil menampilkan semua penulis",
                data: allWriter
            })
        } catch(error){
            res.status(500).send(error)
        }
    },
    getWriterById: async (req, res)=>{
        const writerById = await Writers.findById((req.params.id),"-__v")

        try{
            res.json({
                message: "menampilkan penulis sesuai ID",
                data: writerById,
            })
        } catch(error){
            console.log(error),
            res.status(500).send(error)
        }
    },
    addWriters: async (req,res) =>{
        const data = req.body

        try{
            await Writers.create(data)
            res.json({
                message: 'berhasil input data',
                data: 1,
            })
        } catch(error){
            console.log(error)
            res.status(500).send(error)
        }
    },
    updateWriters: async(req, res)=>{
        const writer = await Writers.findById((req.params.id), "-__v")
        const data = req.body
        try{
            await Writers.replaceOne({_id: req.params.id}, data), 
            res.json({
                message: "Data has been updated"
            })
        }catch(error){
            console.log(error)
            res.status(500).send(error)
        }
    },
    deleteWriters: async(req,res)=>{
        const writer = await Writers.findById((req.params.id), "-__v")
        try{
            await Writers.deleteOne({_id: req.params.id})
            res.json({
                message: "Data has been deleted"
            })
        }catch(error){
            console.log(error)
            res.status(500).send(error)
        }
    }

}
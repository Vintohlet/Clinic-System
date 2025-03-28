import { File } from "../models/File.js";
class FileController{
async getAll(req,res) {
    try {
        const files = await File.find()
        if (!files) {
            res.status(404).json({message: "Files not found"})
        }
        res.json(files)
    } catch (error) {
       res.status(500).json({error: error.message})
    }
}
async create(req,res){
    try {
        const {name} = req.body;
        if (!req.file){
            return res.status(400).json({message: "You did not send picture"})   
        }
        const {filename} = req.file;
        const file = await new File({name, fileUrl: filename}).save();
        res.status(201).json(file);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
}

export default new FileController();
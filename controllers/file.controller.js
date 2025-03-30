import { File } from "../models/File.js";  
import { Appointment } from "../models/Appointment.js";
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
        const {name, appointmentId} = req.body;
        if (!req.file){
            return res.status(400).json({message: "You did not send file!"})   
        }
        const {filename} = req.file;
        const file = await new File({name, fileUrl: filename}).save();
        await Appointment.findByIdAndUpdate(appointmentId, {
            $push:{appointmentFiles:file._id}
        })
        res.status(201).json(file);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
async deleteById(req,res){
    try {
        const file = await File.findByIdAndDelete(
                req.params.id 
              )
              if(!file){
                return res.status(404).json({ error: "File not found" });
              }
              res.status(200).send("File Deleted Successfuly")
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
async updateById(req,res){
    const {name} = req.body
    const {filename} = req.file;
    try {
        const updatedfile =  await File.findByIdAndUpdate( req.body.id, {
                name,
                fileUrl: filename
            }, { new: true })
            if(!updatedfile){
                return res.status(404).json({ error: "file not found" });
            }
            res.status(200).send("file updated Successfuly")
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
}

export default new FileController();
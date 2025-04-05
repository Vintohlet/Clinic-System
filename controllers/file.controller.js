import { File } from "../models/File.js";  
import { Appointment } from "../models/Appointment.js";
import GoogleCloudStorageService from "../services/file-storage.service.js"
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
async getByAppointmentId(req, res) {
    try {
      const { appointmentId } = req.params;
  
      const files = await File.find({ appointmentId });
  
      if (!files || files.length === 0) {
        return res.status(404).json({ message: "No files found for this appointment" });
      }
  
      res.status(200).json(files);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
async create(req,res){
    try {
        const {name, appointmentId} = req.body;
        if (!req.file){
            return res.status(400).json({message: "You did not send file!"})   
        }
        const fileUrl = await GoogleCloudStorageService.uploadFile(req.file, "docs")
        const file = await new File({name, fileUrl}).save();
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
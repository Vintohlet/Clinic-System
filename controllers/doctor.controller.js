import { Doctor } from "../models/Doctor.js"
class DoctorController{
async create (req,res){
    try {
        const {doctorName, speciality,email, experience } = req.body;
        const doctor = await new Doctor({doctorName, email,speciality:{ speciality, experience}}).save();
        res.status(201).json(doctor)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
async getDoctorsById(req,res){
    try {
        const doctor = await Doctor.findById(
            req.params.id
        ).populate("appointments")
        if(!Doctor){
            throw new Error("Doctor not found");
            
        }
        res.json(Doctor)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
async getAllDoctors(req,res){
    try {
        const doctors = await Doctor.find()
        if(doctors.length === 0){
            throw new Error("Doctors not found");
            
        }
        res.json(doctors)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
async getDoctorBySpeciality(req,res){
    try {
        const { specialty } = req.query;
        const filter = specialty ? { specialty } : {};
        const doctors = await Doctor.find(filter);
        if (!doctors.length) {
            return res.status(404).json({ message: "No doctors found" });
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
async deleteDoctorById(req,res){
    try {
      const doctor = await Doctor.findByIdAndDelete(
        req.params.id 
      )
      if(!doctor){
        return res.status(404).json({ error: "Doctor not found" });
      }
      res.status(200).send("Doctor Deleted Successfuly")
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
async updateDoctorById(req,res){
try {
   const updatedDoctor =  await Doctor.findByIdAndUpdate( req.body.id, {
        doctorName,
        speciality
    }, { new: true })
    if(!updatedDoctor){
        return res.status(404).json({ error: "Doctor not found" });
    }
    res.status(200).send("Doctor updated Successfuly")
} catch (error) {
    res.status(500).json({error:error.message})
}
}
}
export default  new DoctorController();
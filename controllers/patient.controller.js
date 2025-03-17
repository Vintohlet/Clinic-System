import { Patient } from "../models/Patient.js"
class PatientController{
async create (req,res){
    try {
        const {patientName, age, email } = req.body;
        const patient = await new Patient({patientName, age, email}).save();
        res.status(201).json(patient)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
async getPatientsById(req,res){
    try {
        const patient = await Patient.findById(
            req.params.id
        ).populate("appointments")
        if(!patient){
            throw new Error("Patient not found");
            
        }
        res.json(patient)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
async getAllPatients(req,res){
    try {
        const patients = await Patient.find()
        if(patients.length === 0){
            throw new Error("Patients not found");
            
        }
        res.json(patients)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
async deletePatientById(req,res){
    try {
      const patient = await Patient.findByIdAndDelete(
        req.params.id 
      )
      if(!patient){
        return res.status(404).json({ error: "Patient not found" });
      }
      res.status(200).send("User Deleted Successfuly")
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
async updatePatientById(req,res){
try {
    const {patientName, age} = req.body
   const updatedPatient =  await Patient.findByIdAndUpdate( req.params.id, {
        patientName,
        age
    }, { new: true })
    if(!updatedPatient){
        return res.status(404).json({ error: "Patient not found" });
    }
    res.status(200).send("User updated Successfuly")
} catch (error) {
    res.status(500).json({error:error.message})
}
}
}
export default  new PatientController();
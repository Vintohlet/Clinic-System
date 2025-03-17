import { Patient } from "../models/Patient.js";
import { Doctor } from "../models/Doctor.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { hashPassword, checkValidPassword } from "../services/bcrypt.js";

class AuthController {
  async patientRegister(req, res) {
    try {
      const { patientName, age, email, password } = req.body;
      const user = await Patient.findOne({ email });
      if (user) {
        return res.status(409).json({ message: "Email already taken" });
      }
      const hashedPassword = await hashPassword(password);
      const patient = await new Patient({
        patientName,
        age,
        email,
        password: hashedPassword
      }).save();
      res.status(201).json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async doctorRegister(req, res) {
    try {
      const { doctorName, speciality, email, experience, password } = req.body;
      const user = await Doctor.findOne({ email });
      if (user) {
        return res.status(409).json({ message: "Email already taken" });
      }
      const hashedPassword = await hashPassword(password);
      const doctor = await new Doctor({
        doctorName,
        email,
        speciality: { speciality, experience },
        password: hashedPassword,
      }).save();
      res.status(201).json(doctor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async patientLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await Patient.findOne({ email });
      console.log("User found in DB:", user);
      if (!user) {
        return res.status(404).json({ message: "Invalid email or password" });
      }
      const passwordIsValid = await checkValidPassword(password, user.password)
      if (!passwordIsValid){
        return res.status(404).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign({userId: user._id},process.env.SECRET_KEY,{expiresIn:"12h"})
      res.json({token})
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async doctorLogin(req, res) {
    try {
      const { email, password } = req.body;
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
        return res.status(404).json({ message: "Invalid email or password" });
      }
      const passwordIsValid = await checkValidPassword(password, doctor.password)
      if (!passwordIsValid){
        return res.status(404).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign({userId: doctor._id},process.env.SECRET_KEY,{expiresIn:"12h"})
      res.json({token})
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
 export default new AuthController()
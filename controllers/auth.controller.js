import { User } from "../models/User.js";
import { Doctor } from "../models/Doctor.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { hashPassword, checkValidPassword } from "../services/bcrypt.js";

class AuthController {
  async userRegister(req, res) {
    try {
      const { firstName, lastName, age, email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({ message: "Email already taken" });
      }
      const hashedPassword = await hashPassword(password);
      const patient = await new User({
        firstName,
        lastName,
        age,
        email,
        password: hashedPassword,
      }).save();
      res.status(201).json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    console.timeEnd("RegistrationTime");
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
        speciality,
        password: hashedPassword,
      }).save();
      res.status(201).json(doctor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      let role = "user";
      let isManager = false;

      if (!user) {
        user = await Doctor.findOne({ email });
        role = "doctor";
      }
      if (!user) {
        return res.status(404).json({ message: "Invalid email or password" });
      }

      if (user.isManager) {
        role = "manager";
        isManager = true;
      }

      const passwordIsValid = await checkValidPassword(password, user.password);
      if (!passwordIsValid) {
        return res.status(404).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { userId: user._id, role, isManager },
        process.env.SECRET_KEY,
        { expiresIn: "12h" }
      );

        res.cookie("accessToken", token, {
        httpOnly: true,
        secure: false, 
        sameSite: "lax",
        path: "/",
        maxAge: 1000 * 60 * 60 * 12, 
      });
      res.status(200).json({ role, isManager });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
    async logout(req, res) {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/", 
      });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
export default new AuthController();

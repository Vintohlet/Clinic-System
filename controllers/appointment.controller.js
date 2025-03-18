import { Appointment } from "../models/Appointment.js";
import { User } from "../models/User.js";
class AppointmentController {
  async create(req, res) {
    try {
      const { appointmentTime, doctorId, patientId } = req.body;
      const appointment = await new Appointment({
        appointmentTime,
        doctorId,
        patientId,
      }).save();
      const patientUpdate = await User.findByIdAndUpdate(patientId, {
        $push: { appointments: appointment._id },
      });
      if (!patientUpdate) {
        return res.status(404).json({ message: "Patient not found!" });
      }
      res
        .status(201)
        .json({ message: `Patient ${patient} successfuly made appointment!` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getAppointmentById(req, res) {
    try {
      const appointment = await Appointment.findById(req.params.id)
        .populate("doctor")
        .populate("patient");
      if (!appointment) {
        throw new Error("Appointment not found");
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getAllAppointment(req, res) {
    try {
      const appointment = await Appointment.find();
      if (appointment.length === 0) {
        throw new Error("Appointment not found");
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async deleteAppointmentById(req, res) {
    try {
      const appointment = await Appointment.findById(req.params.id);
      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      await Appointment.findByIdAndDelete(req.params.id);
      const { patient } = appointment;
      const patientUpdate = await User.findByIdAndUpdate(patient, {
        $pull: { appointments: appointment._id },
      });
      if (!patientUpdate) {
        return res.status(404).json({ message: "Patient not found!" });
      }
      res.status(200).send("Apointment Deleted Successfuly");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async updateAppointmentById(req, res) {
    try {
      const { appointmentTime, doctor, patient } = req.body;
      const updatedPatient = await Appointment.findByIdAndUpdate(
        req.params.id,
        {
          appointmentTime,
          doctor,
        },
        { new: true }
      );
      if (!updatedPatient) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      res.status(200).send("Appointment updated Successfuly");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
export default new AppointmentController();

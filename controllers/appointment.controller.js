import { Appointment } from "../models/Appointment.js";
import { User } from "../models/User.js";
import { Doctor } from "../models/Doctor.js";

class AppointmentController {
  async create(req, res) {
    try {
      const { appointmentTime, doctorId, patientId } = req.body;
      const patient = await User.findById(patientId);
      const doctor = await Doctor.findById(doctorId);
     
      
      if (!patient) {
        return res.status(404).json({ message: "Patient not found!" });
      }
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found!" });
      }
      const appointmentDate = new Date(appointmentTime);
      const appointmentExists = await Appointment.findOne({
          doctorId: doctorId,
          appointmentTime: {
              $gte: appointmentDate, 
              $lt: new Date(appointmentDate.getTime() + 60 * 1000) 
          }
      });

      if (appointmentExists) {
          return res.status(400).json({ message: "This appointment time is already booked for this doctor." });
      }

      const appointment = await new Appointment({
        appointmentTime,
        doctorId,
        patientId,
      }).save();

      await User.findByIdAndUpdate(patientId, {
        $push: { appointments: appointment._id },
      });

      res.status(201).json({ 
        message: `Patient ${patientId} successfully made an appointment!`,
        appointment
      });
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
        return res.status(404).json({ message: "Appointment not found" });
      }

      res.json(appointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllAppointments(req, res) {
    try {
      const appointments = await Appointment.find()
        .populate("doctor")
        .populate("patient");

      if (appointments.length === 0) {
        return res.status(404).json({ message: "No appointments found" });
      }

      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAppointmentsByPatientId(req, res) {
    try {
      const { patientId } = req.params;
      const appointments = await Appointment.find({ patientId })
        .populate("doctor");

      if (appointments.length === 0) {
        return res.status(404).json({ message: "No appointments found for this patient" });
      }

      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAppointmentsByDoctorId(req, res) {
    try {
      const { doctorId } = req.params;
      const appointments = await Appointment.find({ doctorId })
        .populate("patient");

      if (appointments.length === 0) {
        return res.status(404).json({ message: "No appointments found for this doctor" });
      }

      res.json(appointments);
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

      await User.findByIdAndUpdate(appointment.patientId, {
        $pull: { appointments: appointment._id },
      });

      res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateAppointmentById(req, res) {
    try {
      const { appointmentTime, doctorId } = req.body;
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        { appointmentTime, doctorId },
        { new: true }
      );

      if (!updatedAppointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }

      res.status(200).json({ message: "Appointment updated successfully", updatedAppointment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AppointmentController();

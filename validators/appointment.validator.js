import { body } from "express-validator"
import { createCustomValidatorMiddleware } from "./general.validator.js"

const appointmentTime = body("appointmentTime").exists().withMessage("Appointment time is required!") //  Не добавил пока что валидацию типа данных потому что в будущем изменю в модели тип данных
const doctorId = body("doctorId").exists().withMessage("Doctor Id is required!").isMongoId().withMessage("Doctor Id must be correct!")
const patientId = body("patientId").exists().withMessage("Patient Id is required!").isMongoId().withMessage("Patient Id must be correct!")
export const appointmentValidator = createCustomValidatorMiddleware([
    appointmentTime, doctorId,patientId
])
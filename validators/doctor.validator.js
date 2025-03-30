import { body } from "express-validator"
import { createCustomValidatorMiddleware } from "./general.validator.js"
const doctorName =  body("doctorName").exists().withMessage("doctorName field is required!").isString().withMessage("doctorName must be String")
.isLength({min:3}).withMessage("doctorName must contain minimum 3 symbol")
const email = body("email").exists().withMessage("email is required").isEmail().withMessage("email field must be correct")
const experience = body("experience").exists().withMessage("experience is required").isInt({ max: 100 }).withMessage("experience must be integer")
const speciality = body("speciality").exists().withMessage("speciality is required")
const password = body("password").exists().withMessage("Password is required!").isString().withMessage("Password must be String").isLength({min:6}).withMessage("Password must contain minimum 6 symbol")
export const doctorRegisterValidator = createCustomValidatorMiddleware([
    doctorName, email,experience, password, speciality
 ]
)
export const doctorLoginValidator = createCustomValidatorMiddleware([
    email,password
])
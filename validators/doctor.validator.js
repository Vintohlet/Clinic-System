import { body } from "express-validator"
import { createCustomValidatorMiddleware } from "./general.validator.js"

const doctorName = body("doctorName")
  .exists().withMessage("doctorName field is required!")
  .isString().withMessage("doctorName must be a string")
  .isLength({ min: 3 }).withMessage("doctorName must contain at least 3 symbols")

const email = body("email")
  .exists().withMessage("email is required")
  .isEmail().withMessage("email must be a valid email")

const password = body("password")
  .exists().withMessage("Password is required!")
  .isString().withMessage("Password must be a string")
  .isLength({ min: 6 }).withMessage("Password must contain at least 6 symbols")

const specialityObject = body("speciality")
  .exists().withMessage("speciality is required")
  .isObject().withMessage("speciality must be an object")

const specialityField = body("speciality.speciality")
  .exists().withMessage("speciality.speciality is required")
  .isString().withMessage("speciality.speciality must be a string")

const experienceField = body("speciality.experience")
  .exists().withMessage("speciality.experience is required")
  .isNumeric().withMessage("speciality.experience must be a number")
  .custom(value => value >= 0).withMessage("speciality.experience must be >= 0")

export const doctorRegisterValidator = createCustomValidatorMiddleware([
  doctorName,
  email,
  password,
  specialityObject,
  specialityField,
  experienceField
])

export const doctorLoginValidator = createCustomValidatorMiddleware([
  email,
  password
])

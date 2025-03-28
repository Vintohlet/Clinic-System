import { body } from "express-validator"
import { createCustomValidatorMiddleware } from "./general.validator.js"
const firstName =  body("firstName").exists().withMessage("firstName field is required!").isString().withMessage("firstName must be String")
.isLength({min:3}).withMessage("firstName must contain minimum 3 symbol")
const lastName =  body("lastName").exists().withMessage("lastName field is required!").isString().withMessage("lastName must be String")
.isLength({min:3}).withMessage("lastName must contain minimum 3 symbol")
const email = body("email").exists().withMessage("email is required").isEmail().withMessage("email field must be correct")
const age = body("age").exists().withMessage("age is required").isInt({ max: 100 }).withMessage("age must be integer")
const password = body("password").exists().withMessage("Password is required!").isString().withMessage("Password must be String").isLength({min:6}).withMessage("Password must contain minimum 6 symbol")
export const registerValidator = createCustomValidatorMiddleware([
    firstName,lastName,email,age, password,
 ]
)
export const loginValidator = createCustomValidatorMiddleware([
    email,password
])

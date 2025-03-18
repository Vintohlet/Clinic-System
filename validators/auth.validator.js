import { body } from "express-validator"
import { createCustomValidatorMiddleware } from "./general.validator.js"
const userName =  body("userName").exists().withMessage("userName field is required!").isString().withMessage("userName must be String")
.isLength({min:3}).withMessage("userName must contain minimum 3 symbol")
const email = body("email").exists().withMessage("email is required").isEmail().withMessage("email field must be correct")
const age = body("age").exists().withMessage("age is required").isInt().withMessage("age must be integer")
const password = body("password").exists().withMessage("Password is required!").isString().withMessage("Password must be String").isLength({min:6}).withMessage("Password must contain minimum 6 symbol")
export const registerValidator = createCustomValidatorMiddleware([
    userName,email,age, password,
 ]
)
export const loginValidator = createCustomValidatorMiddleware([
    email,password
])

import {check, validationResult} from "express-validator";

let validateRegister = [
    check("email", "Invalid email").isEmail().trim(),

    check("password", "Invalid password. Password must be atleast 2 chars long").isLength({ min: 2 }),

    check("confirmationPassword", "Passwords do not match!").custom((value, { req }) => {
        return value === req.body.password
    }),
    
];

module.exports = {
    validateRegister: validateRegister
}
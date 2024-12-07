import { body } from "express-validator";

const registerValidationRules = [
  body("email").isEmail().withMessage("Debe ser un correo electrónico válido"),
  body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("username").notEmpty().withMessage("El nombre de usuario es obligatorio"),
];

export const loginValidationRules = [
  body("email").isEmail().withMessage("Debe ser un correo electrónico válido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

export { registerValidationRules, loginValidationRules }
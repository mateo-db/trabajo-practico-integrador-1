import { body } from "express-validator";

export const updateProfileValidations = [
    body("first_name")
    .isLength({ min: 2, max: 50}).withMessage("El primer nombre debe contener entre 2 y 50 caracteres")
    .isAlpha("es-ES").withMessage("El primer nombre debe contener solo letras"), //para verificar que contenga solo letras y acepte tildes/ñ
    body("last_name")
    .isLength({ min: 2, max: 50}).withMessage("El segundo nombre debe contener entre 2 y 50 caracteres")
    .isAlpha("es-ES").withMessage("El segundo nombre debe contener solo letras"),
    body("biography")
    .optional()
    .isLength({ max: 500 }).withMessage("La biografía debe tener máximo 500 caracteres"),
    body("avatar_url")
    .optional()
    .isURL().withMessage("La url debe de tener un formato válido")
    .isLength({ max: 255 }).withMessage("La url debe tener un máximo de 255 caracteres"),
    body("birth_date")
    .optional()
    .isDate().withMessage("La fecha de nacimiento debe ser de formato válido")
]
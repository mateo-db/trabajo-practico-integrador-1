import { body } from "express-validator";
import { param } from "express-validator";

export const createTagValidations = [
    body("name")
    .notEmpty().withMessage("El nombre de la etiqueta es obligatorio")
    .isLength({ min: 2, max: 20 }).withMessage("El nombre de la etiqueta debe de tener entre 3 y 20 caracteres")
    .trim()
]

export const updateTagValidations = [
    body("name")
    .notEmpty().withMessage("El nombre de la etiqueta a actualizar es obligatorio")
    .isLength({ min: 2, max: 20 }).withMessage("El nombre de la etiqueta a actualizar debe de tener entre 3 y 20 caracteres")
    .trim()
]

export const getTagByIdValidations = [
    param("id")
    .notEmpty().isInt({gt: 0}).withMessage("El id de la etiqueta debe ser un numero entero positivo")
]
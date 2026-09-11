import { body } from "express-validator";
import { param } from "express-validator";
import { Tag } from "../../models/tag.model.js";

export const createTagValidations = [
    body("name")
    .notEmpty().withMessage("El nombre de la etiqueta es obligatorio")
    .isLength({ min: 2, max: 20 }).withMessage("El nombre de la etiqueta debe de tener entre 3 y 20 caracteres")
    .trim()
    .custom(async (name) => {
        const tagNameAlreadyExist = await Tag.findOne({
            where: {name}
        })
        if (tagNameAlreadyExist) {
            throw new Error("Ese nombre de etiqueta ya existe")
        }
        return true
    })
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

export const deleteTagByIdValidations = [
    param("id")
    .custom(async (id) => {
        const doesTagExist = await Tag.findByPk(id)
        if (!doesTagExist) {
            throw new Error("La etiqueta a eliminar no existe en la base de datos")
        }
    })
]
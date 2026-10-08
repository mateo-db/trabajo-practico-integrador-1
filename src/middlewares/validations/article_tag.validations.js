import { body, param } from "express-validator";
import { Tag } from "../../models/tag.model.js";

export const associateTagWithArticleValidations = [
    body("tag_id")
    .isInt({ gt: 0}).withMessage("El id de la etiqueta a asociar debe ser un numero entero positivo")
    .custom(async (tag_id) => {
        const doesTagExist = await Tag.findByPk(tag_id)
        if (!doesTagExist) {
            throw new Error("Esa etiqueta no existe en la base de datos")
        }
    })
]

export const deleteArticleTagValidations = [
    param("articleTagId")
    .isInt({ gt: 0 }).withMessage("El id de la relación a eliminar debe ser un numero entero positivo")
]
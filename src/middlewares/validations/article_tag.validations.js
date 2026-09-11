import { body, param } from "express-validator";
import { Tag } from "../../models/tag.model.js";
import { Article } from "../../models/article.model.js";

export const associateTagWithArticleValidations = [
    body("tag_id")
    .custom(async (tag_id) => {
        const doesTagExist = await Tag.findByPk(tag_id)
        if (!doesTagExist) {
            throw new Error("Esa etiqueta no existe en la base de datos")
        }
    })
    .isInt({ gt: 0}).withMessage("El id de la etiqueta a asociar debe ser un numero entero positivo"),
    body("article_id")
    .custom(async (article_id) => {
        const doesArticleExist = await Article.findByPk(article_id)
        if (!doesArticleExist) {
            throw new Error("Ese articulo no existe en la base de datos")
        }
    })
    .isInt({ gt: 0 }).withMessage("El id del articulo a asociar debe ser un numero entero positivo")
]

export const deleteArticleTagValidations = [
    param("articleTagId")
    .isInt({ gt: 0 }).withMessage("El id de la relación a eliminar debe ser un numero entero positivo")
]
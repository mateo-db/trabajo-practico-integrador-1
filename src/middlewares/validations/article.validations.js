import { param } from "express-validator";
import { body } from "express-validator";
import { Article } from "../../models/article.model";
import { User } from "../../models/user.model";


export const getArticleByIdValidations = [
    param("id")
    .isInt({ gt: 0 }).withMessage("El id debe ser un numero entero positivo")
    .custom( async (id) => {
        const doesArticleWithIdExist = await Article.findByPk(id)
        if (!doesArticleWithIdExist) {
            throw new Error("El articulo con ese ID no existe en la base de datos")
        }
        return true
    })
]


export const createArticleValidations = [
    body("title")
    .notEmpty().isString().withMessage("El titulo del articulo a crear debe ser una cadena de texto no vacía")
    .isLength({ min: 3, max: 200 }).withMessage("El titulo del articulo debe tener entre 3 y 200 caracteres"),
    body("content")
    .notEmpty().isString().withMessage("El contenido del articulo a crear debe ser una cadena de texto no vacía")
    .isLength({ min: 50 }).withMessage("El contenido del articulo debe tener minimo 50 caracteres"),
    body("excerpt")
    .optional()
    .isString().isLength({ max: 500 }).withMessage("El resumen puede ser un texto de maximo 500 caracteres"),
    body("status")
    .notEmpty()
    .isIn(["published", "archived"]).withMessage("El articulo solo puede tener un estatus de 'published' or 'archived'"),
    body("user_id")
    .notEmpty()
    .custom(async (user_id) => {
        const doesUserExist = await User.findByPk(user_id)
        if (!doesUserExist) {
            throw new Error("El id del usuario asociado a ese articulo no coincide con el ID de un usuario autenticado en nuestra base de datos")
        }
    })
]


export const updateArticleValidations = [
    body("title")
    .optional()
    .notEmpty().isString().withMessage("El titulo del articulo a crear debe ser una cadena de texto no vacía")
    .isLength({ min: 3, max: 200 }).withMessage("Eñ titulo del articulo debe tener entre 3 y 200 caracteres"),
    body("content")
    .optional()
    .notEmpty().isString().withMessage("El contenido del articulo a crear debe ser una cadena de texto no vacía")
    .isLength({ min: 50 }).withMessage("El contenido del articulo debe tener minimo 50 caracteres"),
    body("excerpt")
    .optional()
    .isString().isLength({ max: 500 }).withMessage("El resumen puede ser un texto de maximo 500 caracteres"),
    body("status")
    .optional()
    .notEmpty()
    .isIn(["published", "archived"]).withMessage("El articulo solo puede tener un estatus de 'published' or 'archived'")
]

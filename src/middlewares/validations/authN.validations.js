//importamos herramientas necesarias (body/param) desde express validator
import { body } from "express-validator";
//importamos modelo para validar
import { User } from "../../models/user.model.js";

//array de validaciones para realizar un registro
export const registerValidations = [
    body("username")
    .isLength({min: 3, max: 20}).withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .isAlphanumeric().withMessage("El nombre de usuario debe contener solo letras (A-Z) y numeros (0-9)")
    .custom( async (username) => {
        const doesUsernameAlreadyExist = await User.findOne({
            where: {username}
        })
        if (doesUsernameAlreadyExist) {
            throw new Error("Ese nombre de usuario ya está en ocupación")
        }
        return true
    }),
    body("email")
    .isEmail().withMessage("El email debe ser de formato válido")
    .custom( async (email) => {
        const doesEmailAlreadyExist = await User.findOne({
            where: {email}
        })
        if (doesEmailAlreadyExist) {
            throw new Error("Ese email ya está en ocupación")
        }
        return true
    }),
    body("password").isStrongPassword().withMessage("La contraseña debe contener mínimo 8 caracteres, al menos una mayúscula, minúscula y número."),
    body("role")
    .isIn(["user", "admin"]).withMessage("Unicos roles aceptados son user o admin"),
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

//array de validaciones para logearse
export const loginValidations = [
    body("email")
    .isString().withMessage("El email debe de ser una cádena de caracteres válida")
    .isEmail().withMessage("El email debe ser de un formato válido (ejemplo: ag1144@gmail.com")
    .isLength({ max: 100 }).withMessage("El email no puede contener más de 100 caracteres"),
    body("password")
    .isEmpty().withMessage("La contraseña no puede ser vacía")
]
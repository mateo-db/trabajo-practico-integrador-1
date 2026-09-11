//importamos herramientas necesarias (body/param) desde express validator
import { param } from "express-validator";
import { body } from "express-validator";
//importamos modelo para validar
import { User } from "../../models/user.model.js";

//array de validaciones para traer un usuario por su id
export const getUserByIdValidations = [
    param("id")
    .isInt({ gt: 0 }).withMessage("El id debe ser un numero entero")
    .custom( async (id) => {
        const doesUserWithIdExist = await User.findByPk(id)
        if (!doesUserWithIdExist) {
            throw new Error("El usuario con ese ID no existe en la base de datos")
        }
        return true
    })
]

//array de validaciones para actualizar un usuario por id
export const updateUserByIdValidations = [
    param("id")
    .isInt({ gt: 0 }).withMessage("El id debe ser un numero entero")
    .custom( async (id) => {
        const doesUserToUpdateExist = await User.findByPk(id)
        if (!doesUserToUpdateExist) {
            throw new Error("El usuario a actualizar no existe en la base de datos")
        }
        return true
    }),
    body("username")
    .optional()
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
    .optional()
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
    body("password")
    .optional()
    .isStrongPassword().withMessage("La contraseña debe contener mínimo 8 caracteres, al menos una mayúscula, minúscula y número."),
    body("role")
    .optional()
    .isIn(["user", "admin"]).withMessage("Unicos roles aceptados son user o admin")
]

export const deleteUserByIdValidations = [
    param("id")
    .isInt({ gt: 0 }).withMessage("El id debe ser un numero entero")
    .custom( async (id) => {
        const doesUserToDeleteExist = await User.findByPk(id)
        if (!doesUserToDeleteExist) {
            throw new Error("El usuario a eliminar no existe en la base de datos")
        }
        return true
    })
]
import { Router } from "express"
import { register, login, logout } from "../controllers/authN.controller.js"
import { loginValidations, registerValidations } from "../middlewares/validations/authN.validations.js"
import { checkValidationsResult } from "../middlewares/validationResult.middleware.js"

//de esta forma nombrada ya basta para importarlo en nuestro archivo central del servidor app.js
export const authenRouter = Router()

//endpoint para registrarse
authenRouter.post('/register', registerValidations, checkValidationsResult, register)
//endpoint para iniciar sesión/loguearse
authenRouter.post('/login', loginValidations, checkValidationsResult, login)
//endpoint para cerrar sesión
authenRouter.post('/logout', logout)
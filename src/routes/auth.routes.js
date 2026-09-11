import { Router } from "express"
import { register, login, logout } from "../controllers/authN.controller.js"
import { loginValidations, registerValidations } from "../middlewares/validations/authN.validations.js"
import { checkValidationsResult } from "../middlewares/validationResult.middleware.js"
import { authentication } from "../middlewares/authMiddleware.js"
import { getUserProfile, updateUserProfile } from "../controllers/profile.controller.js"
import { updateProfileValidations } from "../middlewares/validations/profile.validations.js"

//de esta forma nombrada ya basta para importarlo en nuestro archivo central del servidor app.js
export const authenRouter = Router()

//RUTAS PUBLICAS
//endpoint para registrarse
authenRouter.post('/auth/register', registerValidations, checkValidationsResult, register)
//endpoint para iniciar sesión/loguearse
authenRouter.post('/auth/login', loginValidations, checkValidationsResult, login)
//RUTAS PRIVADAS
//obtener perfil del usuario autenticado
authenRouter.get('/auth/profile', authentication, getUserProfile)
//actualizar perfil del usuario autenticado
authenRouter.put('/auth/profile', authentication, updateProfileValidations, checkValidationsResult, updateUserProfile)
//endpoint para cerrar sesión 
authenRouter.post('/logout', authentication, logout)
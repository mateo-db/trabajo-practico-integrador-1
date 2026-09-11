import { Router } from "express";
import { adminAuth } from "../middlewares/adminMiddleware.js";
import { createUserOnlyAdmin, deleteUserById, getAllUsers, getUserById, updateUserById } from "../controllers/user.controller.js";
import { deleteUserByIdValidations, getUserByIdValidations, updateUserByIdValidations } from "../middlewares/validations/user.validations.js";
import { checkValidationsResult } from "../middlewares/validationResult.middleware.js";
import { registerValidations } from "../middlewares/validations/authN.validations.js";
import { authentication } from "../middlewares/authMiddleware.js";

export const userRoutes = Router()

//traer todos los usuarios con sus perfiles (solo admin)
userRoutes.get('/users', authentication, adminAuth, getAllUsers)
//obtener usuario especifico con perfil y articulos  (solo admin)
userRoutes.get('/users/:id', authentication, adminAuth, getUserByIdValidations, checkValidationsResult, getUserById)
//crear un usuario con su perfil (solo admin)
userRoutes.post('/users', authentication, adminAuth, registerValidations, checkValidationsResult, createUserOnlyAdmin)
//actualizar usuario (solo admin)
userRoutes.put('/users/:id', authentication, adminAuth, updateUserByIdValidations, checkValidationsResult, updateUserById)
//eliminar usuario (solo admin)
userRoutes.delete('users/:id', authentication, adminAuth, deleteUserByIdValidations, checkValidationsResult, deleteUserById)

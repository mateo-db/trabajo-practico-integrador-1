import { Router } from "express";
import { authentication } from "../middlewares/authMiddleware.js";
import { adminAuth } from "../middlewares/adminMiddleware.js";
import { createTagValidations, deleteTagByIdValidations, getTagByIdValidations, updateTagValidations } from "../middlewares/validations/tag.validations.js";
import { checkValidationsResult } from "../middlewares/validationResult.middleware.js";
import { createTag, deleteTagById, getAllTags, getTagById, updateTagById } from "../controllers/tag.controller.js";

export const tagRoutes = Router()

//crear etiqueta (solo admin).
tagRoutes.post('/tags', authentication, adminAuth, createTagValidations, checkValidationsResult, createTag)
//listas todas las etiquetas (usuario autenticado)
tagRoutes.get('/tags', authentication, getAllTags)
//obtener etiqueta especifica con articulos asociados (solo admin)
tagRoutes.get('/tags', authentication, adminAuth, getTagByIdValidations, checkValidationsResult, getTagById)
//actualizar etiqueta (solo admin)
tagRoutes.put('/tags', authentication, adminAuth, updateTagValidations, checkValidationsResult, updateTagById)
//eliminar etiqueta (solo admin)
tagRoutes.delete('/tags', authentication, adminAuth, deleteTagByIdValidations, checkValidationsResult, deleteTagById)
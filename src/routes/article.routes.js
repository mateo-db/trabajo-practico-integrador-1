import { Router } from "express";
import { authentication } from "../middlewares/authMiddleware.js";
import { createArticleValidations, getArticleByIdValidations, updateArticleValidations } from "../middlewares/validations/article.validations.js";
import { checkValidationsResult } from "../middlewares/validationResult.middleware.js";
import { createArticle, deleteArticleById, getAllPublishedArticles, getArticleById, getUserArticleById, getUserPublishedArticles, updateArticleById } from "../controllers/article.controller.js";
import { areTheyOwner } from "../middlewares/ownerMiddleware.js";

export const articleRoutes = Router()

//Crear artículo. (usuario autenticado)
articleRoutes.post('/articles', authentication, createArticleValidations, checkValidationsResult, createArticle)
//Listar articulos publicados (usuario autenticado)
articleRoutes.get('/articles', authentication, getAllPublishedArticles)
//Listar articulos publicados del usuario logueado (usuario autenticado)
articleRoutes.get('/articles/user', authentication, getUserPublishedArticles)
//Obtener articulo por su id (usuario autenticado)
articleRoutes.get('/articles/:id', authentication, getArticleByIdValidations, checkValidationsResult, getArticleById)
//Actualizar artículo (solo autor o admin).
articleRoutes.put('/articles/:id', authentication, areTheyOwner, updateArticleValidations, checkValidationsResult, updateArticleById)
//Eliminar articulo (solo autor o admin)
articleRoutes.delete('/articles/:id', authentication, areTheyOwner, getArticleByIdValidations, checkValidationsResult, deleteArticleById)
//Obtener artículo del usuario logueado por su id.(usuario autenticado)
articleRoutes.get('/articles/user/:id', authentication, getArticleByIdValidations, checkValidationsResult, getUserArticleById)
//acá el middleware de validacion getArticleById sirve igual para este endpoint ya que el user ya se sabe quien es gracias al token
import { Router } from "express";
import { authentication } from "../middlewares/authMiddleware.js";
import { areTheyOwner } from "../middlewares/ownerMiddleware.js";
import { associateTagWithArticleValidations, deleteArticleTagValidations } from "../middlewares/validations/article_tag.validations.js";
import { checkValidationsResult } from "../middlewares/validationResult.middleware.js";
import { addTagToArticle, delTagFromArticle } from "../controllers/article_tag.controller.js";

export const articleTagRoutes = Router()

//agregar etiqueta a articulo (solo autor)
articleTagRoutes.post('/article-tags', authentication, areTheyOwner, associateTagWithArticleValidations, checkValidationsResult, addTagToArticle)
//remover etiqueta de articulo (solo autor)
articleTagRoutes.delete('/article-tags/:articleTagId', authentication, areTheyOwner, deleteArticleTagValidations, checkValidationsResult, delTagFromArticle)
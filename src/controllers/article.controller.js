import { Article } from "../models/article.model.js";
import { matchedData } from "express-validator";

//POST /api/articles → Crear artículo. (usuario autenticado)
export const createArticle = async (req, res) => {
    //al crear un recurso, desestructurar datos respectivos del modelo desde matched data especificando locations
    try {
        const { title, content, excerpt, status } = matchedData(req, {locations: ["body"]})
        //pq no desestructuro user_id también para usarlo despues? no es necesario, ya que el usuario no tiene pq enviar por el body el id, nosotros nos fiamos de nuestra info segura sacada del token e inyectada en el request, de ahí simplemente al momento de pasarle el objeto a crear a sequelize ponemos como el valor del campo user_id (que forma parte de los atributos del modelo article) el id del usuario que está en sesión
        const articleCreated = await Article.create({
            title,
            content,
            excerpt,
            status,
            //acá es donde simplemente, el campo o atributo que viene como parte del modelo article, le pasamos como valor el id del usuario en sesión (la que decodi)
            user_id: req.userData.user_id
        })
        return res.status(201).json({
            message: "Se ha creado nuevo árticulo con éxito: ",
            articleCreated
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno en el servidor"
        })
    }
}


//GET /api/articles → Listar artículos publicados. (usuario autenticado)
export const getAllPublishedArticles = async (res) => {
    try {
        const allPublishedArticles = await Article.findAll({
            attributes: {
                exclude: ["user_id"]
            },
            where: {
                status: "published"
            }
        })
        return res.status(200).json({
            message: "Todos los articulos publicados fueron encontrados con éxito: ",
            allPublishedArticles
        })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: "Ocurrió un error interno en el servidor"
            })
        }
}


//GET /api/articles/:id → Obtener artículo por su id. (usuario autenticado)
export const getArticleById = async (req, res) => {
    try {
        const articleId = matchedData(req, {locations: ["params"]})
        const articleFoundByPk = await Article.findByPk(articleId)
        if (!articleFoundByPk) {
            return res.status(404).json({
                message: "No se encontró ese recurso en la base de datos"
            })
        }
        return res.status(200).json({
            message: "Se encontró árticulo especifico con éxito: ",
            articleFoundByPk
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno en la base de datos"
        })
    }
}


//GET /api/articles/user → Listar artículos publicados del usuario logueado. (usuario autenticado)
export const getUserPublishedArticles = async (req, res) => {
    try {
        const loggedUserId = req.userData.user_id
        const articlesByUser = await Article.findAll({
            attributes: {
                exclude: ["user_id"]
            },
            where: {
                user_id: loggedUserId
            }
        })
        return res.status(200).json({
            message: "Todos los árticulos publicados: ",
            articlesByUser
        })
       
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error interno en el servidor"
        })
    }


}


//GET /api/articles/user/:id → Obtener artículo del usuario logueado por su id (usuario autenticado)
export const getUserArticleById = async (req, res) => {
    try {
        const loggedUserId = req.userData.user_id
        const articleId = matchedData(req, {locations: ["params"]})
        const userArticleFound = await Article.findOne({
            where: {
                id: articleId,
                user_id: loggedUserId
            }
        })
        return res.status(200).json({
            message: "Árticulo encontrado: ",
            userArticleFound
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno en el servidor"
        })
    }
   
}


//PUT /api/articles/:id → Actualizar artículo (solo autor o admin).
export const updateArticleById = async (req, res) => {
    try {
        const articleToUpdateId = matchedData(req, {locations: ["params"]})
        const { title, content, excerpt, status } = matchedData(req, {locations: ["body"]})
        const articleUpdated = await Article.update(
            {
                title,
                content,
                excerpt,
                status
            },
            {
                where:
                {
                    id: articleToUpdateId
                }
            }
        )
        return res.status(200).json({
            message: "Se actualizó el árticulo con éxito: ",
            articleUpdated
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno del servidor"
        })
    }
}


//DELETE /api/articles/:id → Eliminación lógica (solo autor o admin).
export const deleteArticleById = async (req, res) => {
    try {
        const articleToDelId = matchedData(req, {locations: ["params"]})
        await Article.destroy({
            where: {id: articleToDelId}
        })
        return res.status(200).json({
            message: "Se eliminó el árticulo exitosamente"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno en el servidor"
        })
    }
}

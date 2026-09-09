import { Article } from "../models/article.model.js";

export const areTheyOwner = async (req, res, next) => {
    try {
        const userSessId = req.userData.user_id
        const articleId = req.params.id
        const articleFound = await Article.findByPk(articleId)
        const articleUserId = articleFound.user_id

        if ((req.userData.role !== "admin") && (articleUserId !== userSessId)) {
            return res.status(403).json({
                message: "No autorizado"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error interno en el servidor"
        })
    }
}
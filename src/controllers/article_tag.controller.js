import { matchedData } from "express-validator";
import { ArticleTag } from "../models/article_tag.model.js";
import { Tag } from "../models/tag.model.js";
import { Article } from "../models/article.model.js";

export const addTagToArticle = async (req, res) => {
    try {
        const { name, article_id, tag_id } = matchedData(req, {locations: ["body"]})
        const doesTagExist = Tag.findByPk(tag_id)
        if (!doesTagExist) {
            return res.status(404).json({
                message: "Esa etiqueta a asociar no existe en la base de datos"
            })
        }
        const newArticleTag = ArticleTag.create({
            name,
            article_id,
            tag_id
        })
        return res.status(201).json({
            message: "Se ha añadido la etiqueta al árticulo con éxito: ",
            newArticleTag
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Ocurrió un error interno en el servidor"
        })
    }
}

export const delTagFromArticle = async (req, res) => {
    try {
        const { articleTagId } = matchedData(req, {locations: ["params"]})
        await ArticleTag.destroy({
            where: {id: doesArticleTagExist.id}
        })
        return res.status(200).json({
            message: "Se eliminó la etiqueta del árticulo con éxito"
        })
    } catch (error) {
        console.error(error)

    }
}

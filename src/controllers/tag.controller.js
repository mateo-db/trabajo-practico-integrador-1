import { Tag } from "../models/tag.model.js";
import { Article } from "../models/article.model.js";
import { matchedData } from "express-validator";

//traer todas las etiquetas
export const getAllTags = async (res) => {
    try {
        const allTags = await Tag.findAll()
        return res.status(200).json({
            message: "Todas las etiquetas fueron encontrados con éxito: ",
            allTags
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno en el servidor"
        })
    }
}

//traer una etiqueta especifica con sus articulos asociados
export const getTagById = async (req, res) => {
    try {
        const { id } = matchedData(req, {locations: ["params"]})
        const tagById = await Tag.findByPk(id, {
            include: 
            [
                {
                    model: Article,
                    as: "articles",
                    through: {
                        attributes: ["article_id"]
                    }
                }
            ],
        })
        return res.status(200).json({
            message: "Se encontró la etiqueta especifica con sus articulos asociados correctamente: ",
            tagById
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno en el servidor"
        })
    }
}
//funcion que crea etiqueta
export const createTag = async (req, res) => {
    try {
        const tagData = matchedData(req, {locations: ["body"]})
        const createdTag = await Tag.create(tagData)
        return res.status(201).json({
            message: "Se creó etiqueta con éxito: ",
            createdTag
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno en el servidor",
        })
    }
}
//funcion que actualiza etiqueta especifico
export const updateTagById = async (req, res) => {
    try {
        const { id } = matchedData(req, {locations: ["params"]})
        const tagDataToUpdate = matchedData(req, {locations: ["body"]})
        const tagToUpdate = await Tag.findByPk(id)
        const updatedTag = await User.update(tagDataToUpdate,
            {
                where: {id: tagToUpdate.id}
            }
        )
        return res.status(200).json({
            message: "Se actualizó etiqueta con éxito: ",
            updatedTag
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno en el servidor"
        })
    }
}

//funcion que elimina etiqueta especifico
export const deleteTagById = async (req, res) => {
    try {
        const tagToDel = matchedData(req, {locations: ["params"]})
        const tagFound = await User.findByPk(id)
        await User.destroy({
            where: { id: userFound.id }
        })
        return res.status(200).json({
            message: "Se eliminó al usuario con éxito"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno del servidor"
        })
    }
}
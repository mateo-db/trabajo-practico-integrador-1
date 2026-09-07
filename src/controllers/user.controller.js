import { User } from "../models/user.model.js";
import { Profile } from "../models/profile.model.js";
import { Article } from "../models/article.model.js";
import { matchedData } from "express-validator";
import { hashPassword } from "../helpers/bcript.helper.js";

//traer todos los usuarios
export const getAllUsers = async (res) => {
    try {
        const allUsers = await User.findAll({
            attributes: {
                exclude: ["password"]
            }
        })
        return res.status(200).json({
            message: "Todos los usuarios fueron encontrados con éxito: ",
            allUsers
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno en el servidor"
        })
    }
}

//traer un usuario especifico con perfil y articulos
export const getUserById = async (req, res) => {
    try {
        const { id } = matchedData(req, {locations: ["params"]})
        const userById = await User.findByPk(id, {
            attributes: {
                exclude: ["password"]
            },
            include: 
            [
                {
                    model: Profile,
                    as: "profile"
                },
                {
                    model: Article,
                    as: "articles"
                }
            ],
        })
        return res.status(200).json({
            message: "Se encontró el usuario especifico con su perfil y articulos correctamente: ",
            userById
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno en el servidor"
        })
    }
}

export const createUser = async (req, res) => {
    try {
        const { username, email, password, role } = matchedData(req, {locations: ["body"]})
        const { first_name, last_name, biography, avatar_url, birth_date } = matchedData(req, {locations: ["body"]})
        const hashedPassword = hashPassword(password)
        const createdUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        })
        const createdUserProfile = await Profile.create({
            user_id: createdUser.id,
            first_name,
            last_name,
            biography,
            avatar_url,
            birth_date
        })
        
        return res.status(201).json({
            message: "Se creó el usuario y su perfil con éxito: ",
            createdUser,
            createdUserProfile
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno en el servidor",
        })
    }
}

export const updateUserById = async (req, res) => {
    try {
        const { id } = matchedData(req, {locations: ["params"]})
        const { username, email, role } = matchedData(req, {locations: ["body"]})
        const userToUpdate = await User.findByPk(id)
        const updatedUser = await User.update(
            {
                username,
                email,
                role
            },
            {
                where: { id: userToUpdate.id}
            }
        )
        return res.status(200).json({
            message: "Se actualizó usuario con éxito: ",
            updatedUser
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno en el servidor"
        })
    }
}

//funcion que elimina user especifico
export const deleteUserById = async (req, res) => {
    try {
        const { id } = matchedData(req, {locations: ["params"]})
        const userFound = await User.findByPk(id)
        await User.destroy({
            where: { id: userFound.id}
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
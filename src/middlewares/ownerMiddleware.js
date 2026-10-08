import { matchedData } from "express-validator";
import { articleModel } from "../models/article.model.js";

export const ownerMiddleware = async (req, res, next) => {
    try {
        const {id} = matchedData(req, {locations: ["params"]})
        const article = await articleModel.findByPk(id);

        if (req.userData.user_role !== "admin" && req.userData.user_id !== article.user_id) {
            return res.status(403).json({ 
                message: "No autorizado" 
            });
        }
        next();
    } catch (error) {
        res.status(500).json({ 
            message: "Error interno del servidor" 
        });
    }
};
import { verifyToken } from "../helpers/jwt.helper.js";

export const authentication = (req, res, next) => {
    try {
        const sessionToken = res.cookie["token"]
        if (!sessionToken) {
            return res.status(401).json({
                message: "Usuario no autenticado"
            })
        }
        decoded = verifyToken(sessionToken)
        req.userData = decoded
        next()
    } catch (error) {
        return res.status(500).json({
            message: "Error al verificar token"
        })
    }

}
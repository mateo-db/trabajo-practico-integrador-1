import { verifyToken } from "../helpers/jwt.helper.js";

export const authentication = (req, res, next) => {
    try {
        const sessionToken = req.cookies["sessionToken"]
        //console.log(sessionToken)
        if (!sessionToken) {
            return res.status(401).json({
                message: "Usuario no autenticado"
            })
        }
        const decoded = verifyToken(sessionToken)
        req.userData = decoded
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Error al verificar token"
        })
    }

}
//middleware para validar si el usuario logueado es admin

export const adminAuth = (req, res, next) => {
    try {
        const loggedUserRole = req.loggedUserData.user_role
    
        if (loggedUserRole !== "admin") {
            return res.status(401).json({
                message: "Usuario no autorizado"
            })
        }
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno del servidor"
        })
    }
}
import { Profile } from "../models/profile.model.js";

export const getUserProfile = async (req, res) => {
    try {
        const loggedUserId = req.userData.user_id
        const userProfile = await Profile.findOne({
            where: {user_id: loggedUserId}
        })
        return res.status(200).json({
            message: "Su perfil: ",
            userProfile

        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno en el servidor"
        })
    }
}

export const updateUserProfile = async (req, res) => {
    const loggedUserId = req.userData.user_id
    const { first_name, last_name, biography, avatar_url, birth_date } = matchedData(req, {locations: ["body"]})
    const profileUpdate = Profile.update({
        first_name,
        last_name,
        biography,
        avatar_url,
        birth_date
    },
    {
        where: {
            user_id: loggedUserId
        }
    })
    return res.status(200).json({
        message: "Se actualizó el perfil con éxito: ",
        profileUpdate
    })
}
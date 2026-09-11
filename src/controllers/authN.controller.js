import { User } from "../models/user.model.js";
import { matchedData } from "express-validator";
import { hashPassword } from "../helpers/bcript.helper.js";
import { comparePassword } from "../helpers/bcript.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

//función asíncrona que registrara al usuario y creará su perfil al mismo tiempo
export const register = async (req, res) => {
    try {
        const { username, email, password } = matchedData(req, {locations: ["body"]})
        const { first_name, last_name, biography, avatar_url, birth_date } = matchedData(req, {locations: ["body"]})
        const hashedPassword = hashPassword(password)
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: "user"
        })
        const newUserProfile = await Profile.create({
            user_id: newUser.id,
            first_name,
            last_name,
            biography,
            avatar_url,
            birth_date
        })
        
        return res.status(201).json({
            message: "Se creó el usuario y su perfil con éxito: ",
            newUser,
            newUserProfile
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno en el servidor",
        })
    }
}

//funcion que logueará al usuario y generará un token para su sesion (al mismo tiempo que la guardará en la cookie)
export const login = async (req, res) => {
    try {
        const { email, password } = matchedData(req, {locations: ["body"]})
        //buscamos si ese usuario está registrado en nuestra base de datos
        const registeredUser = await User.findOne({
            where: {email}
        })
        //validamos: si no encontramos al usuario (es decir, si no existe ese usuario registrado), retornamos código 401 (Unauthorized) y mensaje de explicación
        if (!registeredUser) {
            return res.status(401).json({
                message: "Credenciales incorrectas"
            })
        }
        //llamamos a función helper que compara la contraseña en texto plano (entrante desde el body) versus la contraseña hasheada que guardamos en la base de datos al momento de registrar al usuario
        const validPassword = await comparePassword(password, registeredUser.password)
        //validamos: si no coinciden, retornar código 401 (Unauthorized) y mensaje de explicación
        if (!validPassword) {
            return res.status(401).json({
                message: "Credenciales incorrectas"
            })
        }
        //para este punto ya está logueado el usuario, el siguiente paso es generar la token y cookies
        //configuramos el objeto payload con el id del usuario y el role
        const payload = {
            user_id: registeredUser.id,
            user_role: registeredUser.role,
            exp: "1h"
        }
        //generamos token con helper
        const token = generateToken(payload)
        
        //guardamos token generado dentro de la cookie
        res.cookie("sessionToken", token, {
            httpOnly: true, //para que no se pueda accedar desde JS (DOM)
            maxAge: 1000*60*60, //1 hora
        })
    
        return res.status(200).json({
            message: "Usuario logueado correctamente!"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Ocurrió un error interno en el servidor"
        })
    }
}

//funcion para cerrar sesión (limpiar la cookie)
export const logout = (res) => {
    try {
        res.clearCookie("sessionToken")
        return res.status(200).json({
            message: "Sesión cerrada con éxito"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Error interno en el servidor"
        })
    }
}

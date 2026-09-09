//este middleware es uno que necesitamos para chequear los errores que detectamos y fuimos compilando durante las validaciones, como en las validaciones no utilizamos returns sino throw new error realmente no estamos deteniendo la ejecución del flujo, ahí es donde aparece este middleware con la herramienta "validationResult" de express-validator que actúa como freno de mano
//nota: los errores que vamos detectando en los middlewares de validación con los métodos de express-validators se compilan y guardan dentro de un "secret spot" (propiedad privada) del objeto request... 
// esa compilación "secreta" de errores es la que leemos en este middleware y si detecta que NO está vacía, detenemos el flujo de la petición acá

import { validationResult } from "express-validator";

export const checkValidationsResult = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        //acá tenemos una forma customizada de mostrar errores especificos
        //la variable errors guarda esa compilación de errores, y al aplicarle un método llamado formatWith convertimos ese objeto crudo de errores en uno con un formato menos denso/más legible, como un objeto plano de JavaScript, al método formatWith le pasamos por parametro una función que recibirá errores y retornará solamente el path (campo) y el mensaje explicativo por error, por ultimo a esa variable que guardá los errores formateados le aplicamos el método array() que convertirá nuestro objeto plano de error en una arreglo estandar de JS
        const customError = errors.formatWith((err) => {
            return `${err.path}: ${err.msg}`
        })
        return res.status(400).json(customError.array())
    }
    next()
}
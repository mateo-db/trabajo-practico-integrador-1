//importamos librerías y herramientas para trabajar con el servidor
import express from 'express'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import { userRoutes } from './src/routes/user.routes.js'
import { tagRoutes } from './src/routes/tag.routes.js'
import { authenRouter } from './src/routes/auth.routes.js'
import { articleRoutes } from './src/routes/article.routes.js'
import { articleTagRoutes } from './src/routes/article_tag.routes.js'
import { setupRelations } from './src/models/relations.js'

//guardamos instancia activa de express en memoria como constante "app"
const app = express()

//activamos middleware global para que nuestro sv pueda leer JSON
app.use(express.json())

//activamos middleware global CORS (cross origin resource sharing), va estrictamente antes de las rutas, le decimos a nuestra app express que la use pasandole por parametros el origen y credentials
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true //esto es necesario para habilitar el uso de las cookies desde el frontend
}))

//activamos middleware global çookieParser, permite decodificar cookies y leer tokens
app.use(cookieParser())

//invocamos a la función que trae toda la configuración de nuestras relaciones entre los modelos
setupRelations()

//acá activamos nuestras rutas pasandole a nuestra constante app por parametros la ruta general y el enrutador
app.use('/api', authenRouter) //rutas de autenticación
app.use('/api', userRoutes) //rutas de usuario
app.use('/api', tagRoutes) //rutas de etiqueta
app.use('/api', articleRoutes) //rutas de articulo
app.use('/api', articleTagRoutes) //rutas de tabla intermedia ArticleTag (relación N:M entre etiquetas y articulos)

//dejamos al servidor en escucha pasandole por parametros el puerto (variable de entorno) y una función asíncrona que ejecuta la función que activa nuestra bd junto con un mensaje de éxito
app.listen(process.env.PORT, async () => {
    await rundb()
    console.log("El servidor está corriendo correctamente")
})
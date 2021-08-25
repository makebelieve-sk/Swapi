// Главный файл сервера
import express, { Express } from 'express'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import * as dotenv from 'dotenv'
import PersonRoute from './routes/person.route'
import PlanetRoute from './routes/planet.route'
import StarshipRoute from './routes/starship.route'
import AuthRoute from './routes/auth.route'
import errorMiddleware from './middleware/error.middleware'

const app: Express = express()
dotenv.config()

const PORT: string | number = process.env.PORT || 5000
const MODE: string = process.env.MODE || 'develop'

const corsOptions = {
    origin: process.env.ClIENT_URL,
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())     // Говорим, чтобы express мог распарсить json строку
app.use(cookieParser())

app.use('/api', PersonRoute)
app.use('/api', PlanetRoute)
app.use('/api', StarshipRoute)
app.use('/api/auth', AuthRoute)
app.use(errorMiddleware)

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'dist')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

async function start() {
    try {
        app.listen(PORT, () => console.log(`Приложение запущено на порту ${PORT} в режиме ${MODE}`))
    } catch (error) {
        console.error(`Возникла ошибка при запуске сервера: ${error}`)
        process.exit(1)
    }
}

start().then(null)
// Контроллер управления персонажами
import {Request, Response} from 'express'
import db from '../db.index'
import {Planets, Planet} from '../client/src/types/planets.types'

class PlanetController {
    // Получение одной планеты
    async getPlanet(req: Request, res: Response) {
        try {
            const id = req.params.id

            const planet = await db.query('SELECT * FROM planet WHERE id = $1', [id])

            let answer = planet && planet.rows && planet.rows.length ? planet.rows[0] : null

            return res.status(200).json(answer)
        } catch (e) {
            return res.status(500).json({message: 'Ошибка при получении планеты: ' + e.message})
        }
    }

    // Получение планет
    async getPlanets(req: Request, res: Response) {
        try {
            const planets = await db.query('SELECT * FROM planet')

            const answer = planets && planets.rows && planets.rows.length ? planets.rows : null

            return res.status(200).json(answer)
        } catch (e) {
            return res.status(500).json({message: 'Ошибка при получении планет: ' + e.message})
        }
    }

    // Запись планет в бд
    async setPlanets(req: Request, res: Response) {
        try {
            const swApiPlanets: Planets = req.body

            const callback = async (planet: Planet) => {
                try {
                    await db.query('INSERT INTO planet (id, name, rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
                        [...Object.values(planet)])
                } catch (e) {
                    console.log(e)
                    return res.status(500).json({message: 'Ошибка при сохранении планеты в базу данных: ' + e.message})
                }
            }


            if (swApiPlanets && swApiPlanets.length) {
                for (let i = 0; i < swApiPlanets.length; i++) {
                    await callback(swApiPlanets[i])
                }

                return res.status(200).json({})
            } else {
                new Error('Нет массива записей')
            }
        } catch (e) {
            return res.status(500).json({message: 'Ошибка при сохранении планет в базу данных: ' + e.message})
        }
    }
}

export default new PlanetController()
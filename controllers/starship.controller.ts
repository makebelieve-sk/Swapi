// Контроллер управления персонажами
import {Request, Response} from 'express'
import db from '../db.index'
import {Starships, Starship} from '../client/src/types/starships.types'

class StarshipController {
    // Получение одной планеты
    async getStarship(req: Request, res: Response) {
        try {
            const id = req.params.id

            const starship = await db.query('SELECT * FROM starship WHERE id = $1', [id])

            const answer = starship && starship.rows && starship.rows.length ? starship.rows[0] : null

            return res.status(200).json(answer)
        } catch (e) {
            return res.status(500).json({message: 'Ошибка при получении корабля: ' + e.message})
        }
    }

    // Получение планет
    async getStarships(req: Request, res: Response) {
        try {
            const starships = await db.query('SELECT * FROM starship')

            const answer = starships && starships.rows && starships.rows.length ? starships.rows : null

            return res.status(200).json(answer)
        } catch (e) {
            return res.status(500).json({message: 'Ошибка при получении кораблей: ' + e.message})
        }
    }

    // Запись планет в бд
    async setStarships(req: Request, res: Response) {
        try {
            const swApiStarships: Starships = req.body

            const callback = async (starship: Starship) => {
                try {
                    await db.query('INSERT INTO starship (id, name, model, manufacturer, cost_in_credits, length, max_atmosphering_speed, crew, passengers, cargo_capacity, consumables, hyperdrive_rating, starship_class) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
                        [...Object.values(starship)])
                } catch (e) {
                    console.log(e)
                    return res.status(500).json({message: 'Ошибка при сохранении корабля в базу данных: ' + e.message})
                }
            }


            if (swApiStarships && swApiStarships.length) {
                for (let i = 0; i < swApiStarships.length; i++) {
                    await callback(swApiStarships[i])
                }

                return res.status(200).json({})
            } else {
                new Error('Нет массива записей')
            }
        } catch (e) {
            return res.status(500).json({message: 'Ошибка при сохранении кораблей в базу данных: ' + e.message})
        }
    }
}

export default new StarshipController()
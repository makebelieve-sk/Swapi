// Контроллер управления персонажами
import {Request, Response} from 'express'
import db from '../db.index'
import {People, Person} from "../client/src/types/people.types";

class PersonController {
    // Получение одного персонажа
    async getPerson(req: Request, res: Response) {
        try {
            const id = req.params.id

            const person = await db.query('SELECT * FROM person WHERE id = $1', [id])

            const answer = person && person.rows && person.rows.length ? person.rows[0] : null

            return res.status(200).json(answer)
        } catch (e) {
            return res.status(500).json({message: 'Ошибка при получении персонажа: ' + e.message})
        }
    }

    // Получение персонажей
    async getPeople(req: Request, res: Response) {
        try {
            const people = await db.query('SELECT * FROM person')

            const answer = people && people.rows && people.rows.length ? people.rows : null

            return res.status(200).json(answer)
        } catch (e) {
            return res.status(500).json({message: 'Ошибка при получении персонажей: ' + e.message})
        }
    }

    // Запись персонажей в бд
    async setPeople(req: Request, res: Response) {
        try {
            const swApiPeople: People = req.body

            const callback = async (person: Person) => {
                try {
                    await db.query('INSERT INTO person (id, name, height, mass, hair_color, skin_color, eye_color, birth_year, gender) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
                        [...Object.values(person)])
                } catch (e) {
                    console.log(e)
                    return res.status(500).json({message: 'Ошибка при сохранении персонажа в базу данных: ' + e.message})
                }
            }


            if (swApiPeople && swApiPeople.length) {
                for (let i = 0; i < swApiPeople.length; i++) {
                    await callback(swApiPeople[i])
                }

                return res.status(200).json({})
            } else {
                new Error('Нет массива записей')
            }
        } catch (e) {
            return res.status(500).json({message: 'Ошибка при сохранении персонажей в базу данных: ' + e.message})
        }
    }
}

export default new PersonController()
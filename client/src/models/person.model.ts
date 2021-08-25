import {Person} from '../types/people.types'

export default class PersonModel {
    private id: number
    private name: string
    private height: number
    private mass: number
    private hair_color: string
    private skin_color: string
    private eye_color: string
    private birth_year: string
    private gender: string

    constructor(person: Person) {
        this.id = +person.url.split('/')[5]
        this.name = person.name
        this.height = +person.height
        this.mass = +person.mass
        this.hair_color = person.hair_color
        this.skin_color = person.skin_color
        this.eye_color = person.eye_color
        this.birth_year = person.birth_year
        this.gender = person.gender
    }
}
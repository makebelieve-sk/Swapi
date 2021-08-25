import {Starship} from '../types/starships.types'

export default class StarshipModel {
    private id: number
    private name: string
    private model: string
    private manufacturer: string
    private cost_in_credits: string
    private length: string
    private max_atmosphering_speed: string
    private crew: string
    private passengers: string
    private cargo_capacity: string
    private consumables: string
    private hyperdrive_rating: string
    private starship_class: string

    constructor(starship: Starship) {
        this.id = +starship.url.split('/')[5]
        this.name = starship.name
        this.model = starship.model
        this.manufacturer = starship.manufacturer
        this.cost_in_credits = starship.cost_in_credits
        this.length = starship.length
        this.max_atmosphering_speed = starship.max_atmosphering_speed
        this.crew = starship.crew
        this.passengers = starship.passengers
        this.cargo_capacity = starship.cargo_capacity
        this.consumables = starship.consumables
        this.hyperdrive_rating = starship.hyperdrive_rating
        this.starship_class = starship.starship_class
    }
}
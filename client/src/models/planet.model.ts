import {Planet} from '../types/planets.types'

export default class PlanetModel {
    public id: number
    public name: string
    public rotation_period: number
    public orbital_period: number
    public diameter: number
    public climate: string
    public gravity: string
    public terrain: string
    public surface_water: number
    public population: number
    public url: string

    constructor(planet: Planet) {
        this.id = +planet.url.split('/')[5]
        this.name = planet.name
        this.rotation_period = +planet.rotation_period
        this.orbital_period = +planet.orbital_period
        this.diameter = +planet.diameter
        this.climate = planet.climate
        this.gravity = planet.gravity
        this.terrain = planet.terrain
        this.surface_water = +planet.surface_water
        this.population = +planet.population
        this.url = planet.url
    }
}
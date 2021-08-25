// Типы для планет
import { ThunkAction } from 'redux-thunk'
import {AxiosInstance} from 'axios'

import ActionCreatorPlanets from '../redux/planets/actions'
import { StateType, InferActionsType } from './redux.index'

type Planet = {
    id: number,
    name: string,
    rotation_period: number,
    orbital_period: number,
    diameter: number,
    climate: string,
    gravity: string,
    terrain: string,
    surface_water: number,
    population: number,
    url: string
} | null

type Planets = Planet[]

type PlanetsState = {
    planets: Planets,
    planet: Planet,
    randomPlanet: Planet,
    errorPlanets: string | null,
    errorPlanet: string | null
}

type ActionCreatorPlanetsType = InferActionsType<typeof ActionCreatorPlanets>

type ThunkPlanetsType = ThunkAction<Promise<void>, StateType, AxiosInstance, ActionCreatorPlanetsType>

export {
    Planet,
    Planets,
    PlanetsState,
    ActionCreatorPlanetsType,
    ThunkPlanetsType
}
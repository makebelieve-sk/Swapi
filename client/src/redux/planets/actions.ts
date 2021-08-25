// Действия раздела планет
import { SET_PLANETS, SET_PLANET, SET_RANDOM_PLANET, ERROR_PLANETS, ERROR_PLANET } from './constants'
import { Planets, Planet } from "../../types/planets.types";

const ActionCreatorPlanets = {
    setPlanets: (planets: Planets) => {
        return {
            type: SET_PLANETS,
            payload: planets
        } as const
    },
    setPlanet: (planet: Planet) => {
        return {
            type: SET_PLANET,
            payload: planet
        } as const
    },
    setRandomPlanet: (planet: Planet) => {
        return {
            type: SET_RANDOM_PLANET,
            payload: planet
        } as const
    },
    setErrorPlanets: (error: string) => {
        return {
            type: ERROR_PLANETS,
            payload: error
        } as const
    },
    setErrorPlanet: (error: string) => {
        return {
            type: ERROR_PLANET,
            payload: error
        } as const
    },
}

export default ActionCreatorPlanets
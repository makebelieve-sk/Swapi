// Редьюсер управления разделом планет
import initialStatePlanets from './state'
import {SET_PLANETS, SET_PLANET, ERROR_PLANETS, ERROR_PLANET, SET_RANDOM_PLANET} from './constants'
import { ActionCreatorPlanetsType } from '../../types/planets.types';

const reducerPlanets = (state = initialStatePlanets, action: ActionCreatorPlanetsType) => {
    switch (action.type) {
        case SET_PLANETS:
            return Object.assign({}, state, {
                planets: action.payload
            })
        case SET_PLANET:
            return Object.assign({}, state, {
                planet: action.payload
            })
        case SET_RANDOM_PLANET:
            return Object.assign({}, state, {
                randomPlanet: action.payload
            })
        case ERROR_PLANETS:
            return Object.assign({}, state, {
                errorPlanets: action.payload
            })
        case ERROR_PLANET:
            return Object.assign({}, state, {
                errorPlanet: action.payload
            })
        default:
            return state
    }
}

export default reducerPlanets
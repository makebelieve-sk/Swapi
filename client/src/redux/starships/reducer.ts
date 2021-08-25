// Редьюсер управления разделом кораблей
import initialStateStarships from './state'
import { SET_STARSHIPS, SET_STARSHIP, ERROR_STARSHIPS, ERROR_STARSHIP } from './constants'
import { ActionCreatorStarshipsType } from '../../types/starships.types';

const reducerStarships = (state = initialStateStarships, action: ActionCreatorStarshipsType) => {
    switch (action.type) {
        case SET_STARSHIPS:
            return Object.assign({}, state, {
                starships: action.payload
            })
        case SET_STARSHIP:
            return Object.assign({}, state, {
                starship: action.payload
            })
        case ERROR_STARSHIPS:
            return Object.assign({}, state, {
                errorStarships: action.payload
            })
        case ERROR_STARSHIP:
            return Object.assign({}, state, {
                errorStarship: action.payload
            })
        default:
            return state
    }
}

export default reducerStarships
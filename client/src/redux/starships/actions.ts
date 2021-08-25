// Действия раздела кораблей
import { SET_STARSHIPS, SET_STARSHIP, ERROR_STARSHIPS, ERROR_STARSHIP } from './constants'
import { Starships, Starship } from "../../types/starships.types";

const ActionCreatorStarships = {
    setStarships: (starships: Starships) => {
        return {
            type: SET_STARSHIPS,
            payload: starships
        } as const
    },
    setStarship: (starship: Starship) => {
        return {
            type: SET_STARSHIP,
            payload: starship
        } as const
    },
    setErrorStarships: (error: string) => {
        return {
            type: ERROR_STARSHIPS,
            payload: error
        } as const
    },
    setErrorStarship: (error: string) => {
        return {
            type: ERROR_STARSHIP,
            payload: error
        } as const
    },
}

export default ActionCreatorStarships
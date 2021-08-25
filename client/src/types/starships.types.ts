// Типы для кораблей
import { ThunkAction } from 'redux-thunk'
import {AxiosInstance} from 'axios'

import ActionCreatorStarships from '../redux/starships/actions'
import { StateType, InferActionsType } from './redux.index'

type Starship = {
    id: number,
    name: string,
    model: string,
    manufacturer: string,
    cost_in_credits: string,
    length: string,
    max_atmosphering_speed: string,
    crew: string,
    passengers: string,
    cargo_capacity: string,
    consumables: string,
    hyperdrive_rating: string,
    starship_class: string,
    url: string
} | null

type Starships = Starship[]

type StarshipsState = {
    starships: Starships,
    starship: Starship,
    errorStarships: string | null,
    errorStarship: string | null
}

type ActionCreatorStarshipsType = InferActionsType<typeof ActionCreatorStarships>

type ThunkStarshipsType = ThunkAction<Promise<void>, StateType, AxiosInstance, ActionCreatorStarshipsType>

export {
    Starship,
    Starships,
    StarshipsState,
    ActionCreatorStarshipsType,
    ThunkStarshipsType
}
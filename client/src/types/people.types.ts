// Типы для персонажей
import { ThunkAction } from 'redux-thunk'
import {AxiosInstance} from 'axios'

import ActionCreatorPeople from '../redux/people/actions'
import { StateType, InferActionsType } from './redux.index'

type Person = {
    id: number,
    name: string,
    height: number,
    mass: number,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    birth_year: string,
    gender: string,
    url: string
} | null

type People = Person[]

type PeopleState = {
    people: People,
    person: Person,
    errorPeople: string | null,
    errorPerson: string | null
}

type ActionCreatorPeopleType = InferActionsType<typeof ActionCreatorPeople>

type ThunkPeopleType = ThunkAction<Promise<void>, StateType, AxiosInstance, ActionCreatorPeopleType>

export {
    Person,
    People,
    PeopleState,
    ActionCreatorPeopleType,
    ThunkPeopleType
}
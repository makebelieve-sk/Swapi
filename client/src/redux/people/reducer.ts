// Редьюсер управления разделом персонажей
import initialStatePeople from './state'
import { SET_PEOPLE, SET_PERSON, ERROR_PEOPLE, ERROR_PERSON } from './constants'
import { ActionCreatorPeopleType } from '../../types/people.types';

const reducerPeople = (state = initialStatePeople, action: ActionCreatorPeopleType) => {
    switch (action.type) {
        case SET_PEOPLE:
            return Object.assign({}, state, {
                people: action.payload
            })
        case SET_PERSON:
            return Object.assign({}, state, {
                person: action.payload
            })
        case ERROR_PEOPLE:
            return Object.assign({}, state, {
                errorPeople: action.payload
            })
        case ERROR_PERSON:
            return Object.assign({}, state, {
                errorPerson: action.payload
            })
        default:
            return state
    }
}

export default reducerPeople
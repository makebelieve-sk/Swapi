// Действия раздела персонажей
import { SET_PEOPLE, SET_PERSON, ERROR_PEOPLE, ERROR_PERSON } from './constants'
import { People, Person } from "../../types/people.types";

const ActionCreatorPeople = {
    setPeople: (people: People) => {
        return {
            type: SET_PEOPLE,
            payload: people
        } as const
    },
    setPerson: (person: Person) => {
        return {
            type: SET_PERSON,
            payload: person
        } as const
    },
    setErrorPeople: (error: string) => {
        return {
            type: ERROR_PEOPLE,
            payload: error
        } as const
    },
    setErrorPerson: (error: string) => {
        return {
            type: ERROR_PERSON,
            payload: error
        } as const
    },
}

export default ActionCreatorPeople
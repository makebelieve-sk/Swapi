// Действия раздела персонажей
import { SET_AUTH, ERROR_AUTH } from './constants'
import {User} from "../../types/auth.types";

const ActionCreatorAuth = {
    setUser: (user: User) => {
        return {
            type: SET_AUTH,
            payload: user
        } as const
    },
    setErrorUser: (error: string) => {
        return {
            type: ERROR_AUTH,
            payload: error
        } as const
    },
}

export default ActionCreatorAuth
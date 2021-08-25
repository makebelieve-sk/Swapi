// Редьюсер управления разделом персонажей
import initialStateAuth from './state'
import { SET_AUTH, ERROR_AUTH } from './constants'
import {ActionCreatorAuthType} from '../../types/auth.types'

const reducerAuth = (state = initialStateAuth, action: ActionCreatorAuthType) => {
    switch (action.type) {
        case SET_AUTH:
            return Object.assign({}, state, {
                user: action.payload
            })
        case ERROR_AUTH:
            return Object.assign({}, state, {
                errorUser: action.payload
            })
        default:
            return state
    }
}

export default reducerAuth
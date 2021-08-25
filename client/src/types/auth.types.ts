// Типы для авторизации
import {ThunkAction} from 'redux-thunk'
import {AxiosInstance} from 'axios'

import {InferActionsType, StateType} from './redux.index'
import ActionCreatorAuth from '../redux/auth/actions'

interface SignInProps {
    login: string
    password: string
}

interface SignUpProps {
    email: string
    password: string
    name: string
}

type User = {
    name: string,
    email: string,
    isActivated: boolean | null,
    id: number
}

type UserState = {
    user: null | User,
    errorUser: string
}

type AuthResponse = {
    user: User,
    accessToken: string,
    refreshToken: string
}

type ActionCreatorAuthType = InferActionsType<typeof ActionCreatorAuth>

type ThunkAuthType = ThunkAction<Promise<void>, StateType, AxiosInstance, ActionCreatorAuthType>

export {
    SignInProps,
    SignUpProps,
    User,
    UserState,
    ActionCreatorAuthType,
    ThunkAuthType,
    AuthResponse,
}
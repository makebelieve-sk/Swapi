// Инициализация состояния авторизации
import {UserState} from '../../types/auth.types'

const initialStateAuth: UserState = {
    user: null,
    errorUser: null
}

export default initialStateAuth
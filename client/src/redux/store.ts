// Инициализация redux store
import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import api from '../api/sw-server'
import reducer from './combineReducers'

// Подключаем redux dev-tools, подключаем мидлвар redux-thunk и прокидываем в redux-thunk api
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))))

export default store
// Глобальные типы для redux
import reducer from '../redux/combineReducers'
import store from "../redux/store";

// Типизация действий редьюсера
type PropertyTypes<T> = T extends {[key: string]: infer U} ? U : never
type InferActionsType<T extends {[key: string]: (...args: any) => any}> = ReturnType<PropertyTypes<T>>

type StateType = ReturnType<typeof reducer>
type RootState = ReturnType<typeof store.getState>

export {
    InferActionsType,
    StateType,
    RootState
}
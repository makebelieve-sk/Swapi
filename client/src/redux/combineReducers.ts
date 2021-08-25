// Объединяем редьюсеры приложения в один общий редьюсер
import {combineReducers} from "redux";

import reducerPeople from "./people/reducer";
import reducerPlanets from "./planets/reducer";
import reducerStarships from "./starships/reducer";
import reducerAuth from "./auth/reducer";

const reducer = combineReducers({
    reducerPeople,
    reducerPlanets,
    reducerStarships,
    reducerAuth,
})

export default reducer
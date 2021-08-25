// Инициализация состояния кораблей
import {StarshipsState} from "../../types/starships.types";

const initialStateStarships: StarshipsState = {
    starships: [],
    starship: null,
    errorStarships: null,
    errorStarship: null
}

export default initialStateStarships
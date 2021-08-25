// Инициализация состояния планет
import {PlanetsState} from "../../types/planets.types";

const initialStatePlanets: PlanetsState = {
    planets: [],
    planet: null,
    randomPlanet: null,
    errorPlanets: null,
    errorPlanet: null
}

export default initialStatePlanets
import React from "react";
import {AxiosError, AxiosResponse} from "axios";

import store from "../redux/store";
import Operation from "../redux/planets/thunks";
import ActionCreatorPlanets from "../redux/planets/actions";
import localApi from "../api/local-server";
import {Planets} from "../types/planets.types";
import {stateType} from "../components/random-planet";

const PlanetController = {
    getAll: (setLoading:  React.Dispatch<React.SetStateAction<boolean>>) => {
        function resolveCallback(response: AxiosResponse<Planets>) {
            const data = response.data

            // Если записи в базе данных есть, выдаем их
            if (data && data.length) {
                store.dispatch(ActionCreatorPlanets.setPlanets(data))
            } else {
                // Иначе запрашиваем данные с ресурса
                store.dispatch(Operation.loadPlanets(setLoading, rejectCallback, finallyCallback)).then(null)
            }
        }

        function rejectCallback(error: AxiosError) {
            store.dispatch(ActionCreatorPlanets.setErrorPlanets(error.message))
        }

        function finallyCallback() {
            setLoading(false)
        }

        setLoading(true)

        localApi.get('/planets')
            .then(resolveCallback)
            .catch(rejectCallback)
            .finally(finallyCallback)
    },
    getPlanet: (id: string, setLoading:  React.Dispatch<React.SetStateAction<boolean>>) => {
        function rejectCallback(error: AxiosError) {
            store.dispatch(ActionCreatorPlanets.setErrorPlanet(error.message))
        }

        function finallyCallback() {
            setLoading(false)
        }

        setLoading(true)

        store.dispatch(Operation.loadPlanet(id, rejectCallback, finallyCallback)).then(null)
    },
    getRandomPlanet: (id: string, setState: React.Dispatch<React.SetStateAction<stateType>>) => {
        function rejectCallback(error: AxiosError) {
            store.dispatch(ActionCreatorPlanets.setErrorPlanet(error.message))
        }

        store.dispatch(Operation.loadPlanet(id, rejectCallback, () => {}, setState)).then(null)
    }
}

export default PlanetController
import React from "react";
import {AxiosError, AxiosResponse} from "axios";

import store from "../redux/store";
import Operation from "../redux/starships/thunks";
import ActionCreatorStarships from "../redux/starships/actions";
import localApi from "../api/local-server";
import {Starships} from "../types/starships.types";

const StarshipController = {
    getAll: (setLoading:  React.Dispatch<React.SetStateAction<boolean>>) => {
        function resolveCallback(response: AxiosResponse<Starships>) {
            const data = response.data

            // Если записи в базе данных есть, выдаем их
            if (data && data.length) {
                store.dispatch(ActionCreatorStarships.setStarships(data))
            } else {
                // Иначе запрашиваем данные с ресурса
                store.dispatch(Operation.loadStarships(setLoading, rejectCallback, finallyCallback)).then(null)
            }
        }

        function rejectCallback(error: AxiosError) {
            store.dispatch(ActionCreatorStarships.setErrorStarships(error.message))
        }

        function finallyCallback() {
            setLoading(false)
        }

        setLoading(true)

        localApi.get('starships')
            .then(resolveCallback)
            .catch(rejectCallback)
            .finally(finallyCallback)
    },
    getStarship: (id: string, setLoading:  React.Dispatch<React.SetStateAction<boolean>>) => {
        function rejectCallback(error: AxiosError) {
            store.dispatch(ActionCreatorStarships.setErrorStarship(error.message))
        }

        function finallyCallback() {
            setLoading(false)
        }

        setLoading(true)

        store.dispatch(Operation.loadStarship(id, rejectCallback, finallyCallback)).then(null)
    }
}

export default StarshipController
import React from 'react'
import axios, {AxiosError, AxiosResponse} from 'axios'

import ActionCreatorStarships from './actions'
import {Starships, Starship, ThunkStarshipsType} from '../../types/starships.types'
import StarshipModel from '../../models/starship.model'
import localApi from '../../api/local-server'
import store from "../store";

const Operation = {
    loadStarships: (setLoading: React.Dispatch<React.SetStateAction<boolean>>, rejectCallback: (error: AxiosError | string) => void, finallyCallback: () => void): ThunkStarshipsType =>
        async (dispatch, getState, api) => {
            try {
                const response = await api.get('/starships/')
                const data = response.data

                if (data && data.results && data.results.length) {
                    const items: Starships = data.results.map((starship: Starship) => new StarshipModel(starship))

                    if (items && items.length) {
                        dispatch(ActionCreatorStarships.setStarships(items))

                        localApi.post('starships', items)
                            .then(null)
                            .catch(rejectCallback)
                            .finally(finallyCallback)
                    } else {
                        rejectCallback("Нет записей")
                    }
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error)
                    // Access to config, request, and response
                } else {
                    dispatch(ActionCreatorStarships.setErrorStarships('Произошла ошибка при загрузке кораблей: ' + error.message))
                }
            } finally {
                setLoading(false)
            }
        },
    loadStarship: (id: string, rejectCallback: (error: AxiosError | string) => void, finallyCallback: () => void): ThunkStarshipsType =>
        async (dispatch, getState, api) => {
            try {
                const resolveCallback = (response: AxiosResponse) => {
                    const data = response.data

                    if (data) {
                        store.dispatch(ActionCreatorStarships.setStarship(data))
                    }
                };

                localApi.get('/starships/' + id)
                    .then(resolveCallback)
                    .catch(rejectCallback)
                    .finally(finallyCallback)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error)
                    // Access to config, request, and response
                } else {
                    dispatch(ActionCreatorStarships.setErrorStarship('Произошла ошибка при загрузке корабля: ' + error.message))
                }
            }
        }
}

export default Operation
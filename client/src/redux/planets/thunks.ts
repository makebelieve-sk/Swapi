import React from 'react'
import axios, {AxiosError, AxiosResponse} from 'axios'

import ActionCreatorPlanets from './actions'
import {Planets, Planet, ThunkPlanetsType} from '../../types/planets.types'
import PlanetModel from '../../models/planet.model'
import localApi from '../../api/local-server'
import store from "../store";
import {stateType} from "../../components/random-planet";

const Operation = {
    loadPlanets: (setLoading: React.Dispatch<React.SetStateAction<boolean>>, rejectCallback: (error: AxiosError | string) => void, finallyCallback: () => void): ThunkPlanetsType =>
        async (dispatch, getState, api) => {
            try {
                const response = await api.get('/planets/')
                const data = response.data

                if (data && data.results && data.results.length) {
                    const items: Planets = data.results.map((planet: Planet) => new PlanetModel(planet))

                    if (items && items.length) {
                        dispatch(ActionCreatorPlanets.setPlanets(items))

                        localApi.post('/planets', items)
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
                    dispatch(ActionCreatorPlanets.setErrorPlanets('Произошла ошибка при загрузке планет: ' + error.message))
                }
            } finally {
                setLoading(false)
            }
        },
    loadPlanet: (id: string, rejectCallback: (error: AxiosError | string) => void, finallyCallback: () => void, setState: React.Dispatch<React.SetStateAction<stateType>> = null): ThunkPlanetsType =>
        async (dispatch, getState, api) => {
            try {
                const resolveCallback = async (response: AxiosResponse<Planet>) => {
                    const data = response.data

                    if (data) {
                        if (setState) {
                            store.dispatch(ActionCreatorPlanets.setRandomPlanet(data))

                            setState({
                                planet: data,
                                loading: false,
                                error: ''
                            })
                        } else {
                            store.dispatch(ActionCreatorPlanets.setPlanet(data))
                        }

                    } else {
                        const response = await api.get('/planets/' + id)
                        const data = response.data

                        if (data) {
                            const planet: Planet = new PlanetModel(data)

                            if (setState) {
                                store.dispatch(ActionCreatorPlanets.setRandomPlanet(planet))

                                setState({
                                    planet: planet,
                                    loading: false,
                                    error: ''
                                })
                            } else {
                                store.dispatch(ActionCreatorPlanets.setPlanet(planet))
                            }
                        }
                    }
                };

                localApi.get('/planets/' + id)
                    .then(resolveCallback)
                    .catch(rejectCallback)
                    .finally(finallyCallback)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error)
                    // Access to config, request, and response
                } else {
                    dispatch(ActionCreatorPlanets.setErrorPlanet('Произошла ошибка при загрузке планеты: ' + error.message))
                }
            }
        }
}

export default Operation
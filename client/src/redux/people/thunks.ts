import React from 'react'
import axios, {AxiosError, AxiosResponse} from 'axios'

import ActionCreatorPeople from './actions'
import {People, Person, ThunkPeopleType} from '../../types/people.types'
import PersonModel from '../../models/person.model'
import localApi from '../../api/local-server'
import store from "../store";

const Operation = {
    loadPeople: (setLoading: React.Dispatch<React.SetStateAction<boolean>>, rejectCallback: (error: AxiosError | string) => void, finallyCallback: () => void): ThunkPeopleType =>
        async (dispatch, getState, api) => {
            try {
                const response = await api.get('/people/')
                const data = response.data

                if (data && data.results && data.results.length) {
                    const items: People = data.results.map((person: Person) => new PersonModel(person))

                    if (items && items.length) {
                        dispatch(ActionCreatorPeople.setPeople(items))

                        localApi.post('/people', items)
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
                    dispatch(ActionCreatorPeople.setErrorPeople('Произошла ошибка при загрузке персонажей: ' + error.message))
                }
            } finally {
                setLoading(false)
            }
        },
    loadPerson: (id: string, rejectCallback: (error: AxiosError | string) => void, finallyCallback: () => void): ThunkPeopleType =>
        async (dispatch, getState, api) => {
            try {
                const resolveCallback = (response: AxiosResponse) => {
                    const data = response.data

                    if (data) {
                        store.dispatch(ActionCreatorPeople.setPerson(data))
                    }
                };

                localApi.get('/people/' + id)
                    .then(resolveCallback)
                    .catch(rejectCallback)
                    .finally(finallyCallback)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error)
                    // Access to config, request, and response
                } else {
                    dispatch(ActionCreatorPeople.setErrorPerson('Произошла ошибка при загрузке персонажа: ' + error.message))
                }
            }
        }
}

export default Operation
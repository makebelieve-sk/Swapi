import React from 'react'
import {AxiosError, AxiosResponse} from 'axios'

import store from '../redux/store'
import Operation from '../redux/people/thunks'
import ActionCreatorPeople from '../redux/people/actions'
import localApi from '../api/local-server'
import {People} from '../types/people.types'

const PersonController = {
    getAll: (setLoading:  React.Dispatch<React.SetStateAction<boolean>>) => {
        function resolveCallback(response: AxiosResponse<People>) {
            const data = response.data

            // Если записи в базе данных есть, выдаем их
            if (data && data.length) {
                store.dispatch(ActionCreatorPeople.setPeople(data))
            } else {
                // Иначе запрашиваем данные с ресурса
                store.dispatch(Operation.loadPeople(setLoading, rejectCallback, finallyCallback)).then(null)
            }
        }

        function rejectCallback(error: AxiosError) {
            store.dispatch(ActionCreatorPeople.setErrorPeople(error.message))
        }

        function finallyCallback() {
            setLoading(false)
        }

        setLoading(true)

        localApi.get('/people')
            .then(resolveCallback)
            .catch(rejectCallback)
            .finally(finallyCallback)
    },
    getPerson: (id: string, setLoading:  React.Dispatch<React.SetStateAction<boolean>>) => {
        function rejectCallback(error: AxiosError) {
            store.dispatch(ActionCreatorPeople.setErrorPerson(error.message))
        }

        function finallyCallback() {
            setLoading(false)
        }

        setLoading(true)

        store.dispatch(Operation.loadPerson(id, rejectCallback, finallyCallback)).then(null)
    }
}

export default PersonController
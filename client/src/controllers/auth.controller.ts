import React from 'react'
import axios, {AxiosError, AxiosResponse} from 'axios'

import localApi from '../api/local-server'
import {SignInProps, AuthResponse, SignUpProps} from '../types/auth.types'
import store from '../redux/store'
import ActionCreatorAuth from '../redux/auth/actions'

const AuthController = {
    signIn: (values: SignInProps, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        function resolveCallback(response: AxiosResponse<AuthResponse>) {
            const data = response.data

            if (data) {
                store.dispatch(ActionCreatorAuth.setUser(data.user))
                localStorage.setItem('token', data.accessToken)
            }
        }

        function rejectCallback(error: AxiosError) {
            store.dispatch(ActionCreatorAuth.setErrorUser(error.message))
        }

        function finallyCallback() {
            setLoading(false)
        }

        localApi.post<AuthResponse>('/auth/sign-in', values)
            .then(resolveCallback)
            .catch(rejectCallback)
            .finally(finallyCallback)
    },
    signUp: (values: SignUpProps, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        function resolveCallback(response: AxiosResponse<AuthResponse>) {
            const data = response.data

            if (data) {
                store.dispatch(ActionCreatorAuth.setUser(data.user))
                localStorage.setItem('token', data.accessToken)
            }
        }

        function rejectCallback(error: AxiosError) {
            store.dispatch(ActionCreatorAuth.setErrorUser(error.message))
        }

        function finallyCallback() {
            setLoading(false)
        }

        localApi.post<AuthResponse>('/auth/sign-up', values)
            .then(resolveCallback)
            .catch(rejectCallback)
            .finally(finallyCallback)
    },
    logout: () => {
        function resolveCallback(response: AxiosResponse<Promise<void>>) {
            store.dispatch(ActionCreatorAuth.setUser(null))
            localStorage.removeItem('token')
        }

        function rejectCallback(error: AxiosError) {
            store.dispatch(ActionCreatorAuth.setErrorUser(error.message))
        }

        localApi.get('/auth/logout')
            .then(resolveCallback)
            .catch(rejectCallback)
    },
    checkAuth: () => {
        function resolveCallback(response: AxiosResponse<AuthResponse>) {
            const data = response.data

            if (data) {
                store.dispatch(ActionCreatorAuth.setUser(data.user))
                localStorage.setItem('token', data.accessToken)
            }
        }

        function rejectCallback(error: AxiosError) {
            store.dispatch(ActionCreatorAuth.setErrorUser(error.message))
        }

        axios.get<AuthResponse>('http://localhost:5000/api/auth/refresh', {withCredentials: true})
            .then(resolveCallback)
            .catch(rejectCallback)
    }
}

export default AuthController
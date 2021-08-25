// Создаем экземпляр axios
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import AuthController from "../controllers/auth.controller";

const config: AxiosRequestConfig = {
    baseURL: 'http://localhost:5000/api',
    timeout: 5000,
    withCredentials: true
}

const localApi: AxiosInstance = axios.create(config)

// Перехватчик на запрос, добавляем в заголовок access токен
localApi.interceptors.response.use((config: AxiosResponse<any>) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

// Перехватчик на ответ, обновляем access токен
localApi.interceptors.response.use((config: AxiosResponse<any>) => {
    return config
}, (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true

        AuthController.checkAuth()

        return localApi.request(originalRequest)
    }

    throw error
})

export default localApi
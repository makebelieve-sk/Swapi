// Создаем экземпляр axios
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
    baseURL: 'https://swapi.dev/api',
    timeout: 5000,
}

const api: AxiosInstance = axios.create(config)

export default api
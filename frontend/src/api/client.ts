import axios from 'axios'
import { clearAuthStorage, tokenStorage } from '../utils/storage'

const baseURL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000'

export const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = tokenStorage.get()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const url = error.config?.url ?? ''
    if (status === 401 && tokenStorage.get() && !url.includes('/auth/')) {
      clearAuthStorage()
      window.location.assign('/login')
    }

    return Promise.reject(error)
  },
)

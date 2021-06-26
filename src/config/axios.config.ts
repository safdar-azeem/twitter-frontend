import axios from 'axios'
import Cookies from 'js-cookie'

const baseURL = import.meta.env.VITE_API_URL as string

const api = axios.create({
   baseURL,
   headers: {
      'Content-Type': 'application/json',
   },
})

api.interceptors.request.use(
   (config: any) => {
      const token = Cookies.get('token')
      if (token) {
         config.headers.Authorization = `Bearer ${token}`
      }
      return config
   },
   (error) => {
      return Promise.reject(error)
   }
)

export default api

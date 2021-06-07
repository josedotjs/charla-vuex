import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
})

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    Promise.reject(error)
  }
)

const api = {
  get(url, config) {
    return axiosInstance.get(url, config)
  },
  post(url, data, config) {
    return axiosInstance.post(url, data, config)
  },
}

export default api

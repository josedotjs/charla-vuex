import api from './api'

export const getAll = () => {
  return api.get('/products')
}

export const create = (data) => {
  return api.post('/products', data)
}

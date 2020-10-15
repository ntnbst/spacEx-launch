import axios from 'axios'
import { SPACEX_API_BASE_URL } from './constants'

export const endpoints = {
   launches: '/v3/launches'
}

export const makeAPIRequest = async (method = 'get', endpoint, params = {}, headers = {}) => {
  try {
    const res = await axios({
      method: method,
      url: `${SPACEX_API_BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      // timeout: 8000,
      params: { ...params }
    })
    return res.data
  } catch (error) {
    throw error
  }
}
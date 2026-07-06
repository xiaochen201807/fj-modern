import axios from 'axios'

export const httpClient = axios.create({
  timeout: 30000,
  withCredentials: true
})

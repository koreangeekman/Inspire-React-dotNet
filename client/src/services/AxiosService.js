import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})
export const weatherAPI = Axios.create({ // returns 5 day forecast results per 3 hrs
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
  timeout: 8000,
  params: {
    appid: ''
  }
})
api.defaults.headers.authorization = JSON.parse(localStorage.getItem('user-token'))
import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 4000
})

export const bcwSandbox = Axios.create({
  baseURL: 'https://sandbox.codeworksacademy.com/',
  timeout: 4000,
  params: {
    clientId: 'pOXw2OGv1LsYi7LEBmDF04RLkXQvldml',
    domain: 'codeworksclassroom.auth0.com',
    audience: 'https://codeworksclassroom.com'
  }
})

export const weatherAPI = Axios.create({ // returns 5 day forecast results per 3 hrs
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
  timeout: 5000,
  params: {
    appid: 'dee0e73cd11c32c4b232ebc392880683'
  }
})

api.defaults.headers.authorization = JSON.parse(localStorage.getItem('user-token'))
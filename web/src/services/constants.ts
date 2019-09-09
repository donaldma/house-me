import axios from 'axios'

const apiEndpoint = 'https://get-house-me.herokuapp.com/api'
let API = createAxiosInstance()

function createAxiosInstance() {
  return axios.create({
    baseURL: apiEndpoint,
    headers: { Authorization: getToken() }
  })
}

function resetAxiosInstance() {
  API = createAxiosInstance()
}

function getToken() {
  return window.localStorage.token || ''
}

export { apiEndpoint, API, resetAxiosInstance }

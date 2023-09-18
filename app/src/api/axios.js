import axios from "axios"

const url = 'http://localhost:8080/'

export default axios.create({
    baseURL:url
})

export const axiosAuth = axios.create({
    baseURL:url,
    headers : {'Content-Type':'application/json'},
    withCredentials: true
})

export const axiosAuthMultiPart = axios.create({
    baseURL:url,
    headers : { "Content-Type": "multipart/form-data"},
    withCredentials: true
})
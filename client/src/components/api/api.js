import axios from "axios";
export const baseURL = 'http://localhost:5000/api'
export const instance = axios.create({
    baseURL: baseURL
})

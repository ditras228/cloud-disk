import axios from "axios";
export const baseURL = 'http://192.168.100.2:5000/api'
export const instance = axios.create({
    baseURL: baseURL
})

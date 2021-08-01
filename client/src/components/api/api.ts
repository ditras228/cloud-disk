import axios from "axios";
export const baseURL = ' http://87.236.22.121:5001'
export const instance = axios.create({
    baseURL: `${baseURL}/api`
})

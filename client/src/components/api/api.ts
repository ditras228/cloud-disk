import axios from "axios";
export const baseURL = ' https://whispering-escarpment-50285.herokuapp.com'
export const instance = axios.create({
    baseURL: `${baseURL}/api`
})

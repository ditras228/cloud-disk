import {instance} from "../api/api";
import {setUser} from "../../reducers/userReducer";

export const registration = async (email, password)=>{
    try{
        const response= await instance.post('auth/registration/', {
            email,
            password
        })
    }catch (e){
        console.log(e)
    }
}
export const login =  (email, password)=>{
    return async dispatch =>{
        try{
            const response= await instance.post('auth/login', {
                email,
                password
            })
            dispatch(setUser(response.data))
                localStorage.setItem('token',response.data.token)
        }catch (e){
            console.log(e)
        }
    }

}
export const auth =  ()=>{
    return async dispatch =>{
        try{
            const response= await instance.get('auth/auth',
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(setUser(response.data))
            localStorage.setItem('token',response.data.token)
        }catch (e){
            console.log(e)
            localStorage.removeItem('token')
        }
    }

}
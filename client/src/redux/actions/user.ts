import {instance} from "../../components/api/api";
import {userReducerAction, userReducerActionType} from '../reducers/userReducer'
import {BaseThunkType} from '../reducers'

export const registration = async (email: string, password: string)=>{
    try{
        await instance.post('auth/registration/', {
            email,
            password
        })
    }catch (e){
        console.log(e)
    }
}
export const login =  (email: string, password: string):userThunkType =>{
    return async dispatch =>{
        try{
            const response= await instance.post('auth/login', {
                email,
                password
            })
            localStorage.setItem('token',response.data.token)
            dispatch(userReducerAction.setUser(response.data))
        }catch (e){
            console.log(e)
        }
    }

}
export const auth =  (): userThunkType=>{
    return async dispatch =>{
        try{
            const response= await instance.get('auth/auth',
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(userReducerAction.setUser(response.data))
            localStorage.setItem('token',response.data.token)
        }catch (e){
            console.log(e)
            localStorage.removeItem('token')
        }
    }

}
export const uploadAvatar=(file: any): userThunkType=>{
    return async dispatch =>{
        try{
            const formData = new FormData()
            formData.append('file', file)
            const response =  await instance.post('/avatar', formData,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(userReducerAction.setUser(response.data))
        }catch (e){
            console.log(e)
        }

    }

}
export const deleteAvatar=(): userThunkType=> {
    return async dispatch => {
        try {
            const response = await instance.delete('/avatar',
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(userReducerAction.setUser(response.data))
        } catch (e) {
            console.log(e)
        }

    }
}
type userThunkType = BaseThunkType<userReducerActionType>
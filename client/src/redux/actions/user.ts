import {instance} from '../../components/api/api'
import {userReducerAction} from '../reducers/userReducer'
import {appReducerAction} from '../reducers/appReducer'

export const registration =  (email: string, password: string) => {
    return async (dispatch: any)  => {
        try {
            const response = await instance.post('auth/registration/', {
                email,
                password
            })
            if(response.status==200){
                (dispatch(userReducerAction.setRegistration()))
            }
        } catch (e) {
            console.log(e)
            dispatch(appReducerAction.error('Пользователь с таким email уже существует'))
        }
    }
}
export const login = (email: string, password: string) => {
    return async (dispatch: any) => {
        try {
            const response = await instance.post('auth/login', {
                email,
                password
            })
            localStorage.setItem('token', response.data.token)
            dispatch(userReducerAction.setUser(response.data))
        } catch (e) {
            console.log(e)
            dispatch(appReducerAction.error('Неверный логин/пороль'))
        }


    }

}
export const auth = () => {
    return async (dispatch: any) => {
        try {
            const response = await instance.get('auth/auth',
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(userReducerAction.setUser(response.data))
            localStorage.setItem('token', response.data.token)
            console.log(`Bearer ${localStorage.getItem('token')}`)

        } catch (e) {
            console.log(e)
            localStorage.removeItem('token')
        }
    }

}
export const uploadAvatar = (file: any) => {
    return async (dispatch: any) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await instance.post('files/avatar', formData,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(userReducerAction.addAvatar(response.data))
        } catch (e) {
            console.log(e)
        }

    }

}
export const deleteAvatar = () => {
    return async (dispatch: any) => {
        try {
            const response = await instance.delete('/avatar',
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(userReducerAction.setUser(response.data))
        } catch (e) {
            console.log(e)
        }

    }
}
export const SetMobile = () => {
    return async (dispatch: any) => {
        try {

            dispatch(userReducerAction.setMobile(true))
        } catch (e) {
            console.log(e)
        }

    }

}

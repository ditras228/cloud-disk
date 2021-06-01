import {instance} from '../../components/api/api'
import {userReducerAction, userReducerActionType} from '../reducers/userReducer'
import {BaseThunkType} from '../reducers'
import {appReducerAction} from '../reducers/appReducer'

export const registration =  (email: string, password: string): userThunkType => {
    return async dispatch => {
        try {
            const response = await instance.post('auth/registration/', {
                email,
                password
            })
            dispatch(userReducerAction.setUser(response.data))
        } catch (e) {
            console.log(e)
            // @ts-ignore
            dispatch(appReducerAction.error('Пользователь с таким email уже существует'))
        }
    }
}
export const login = (email: string, password: string): userThunkType => {
    return async dispatch => {
        try {
            const response = await instance.post('auth/login', {
                email,
                password
            })
            localStorage.setItem('token', response.data.token)
            dispatch(userReducerAction.setUser(response.data))
        } catch (e) {
            console.log(e)
            // @ts-ignore
            dispatch(appReducerAction.error('Неверный логин/пороль'))
        }


    }

}
export const auth = (): userThunkType => {
    return async dispatch => {
        try {
            const response = await instance.get('auth/auth',
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(userReducerAction.setUser(response.data))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log(e)
            localStorage.removeItem('token')
        }
    }

}
export const uploadAvatar = (file: any): userThunkType => {
    return async dispatch => {
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
export const deleteAvatar = (): userThunkType => {
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
export const SetMobile = (): userThunkType => {
    return async dispatch => {
        try {

            dispatch(userReducerAction.setMobile(true))
        } catch (e) {
            console.log(e)
        }

    }

}
type userThunkType = BaseThunkType<userReducerActionType>
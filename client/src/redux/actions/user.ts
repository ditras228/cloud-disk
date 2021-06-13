import {instance} from '../../components/api/api'
import {userReducerAction} from '../reducers/userReducer'
import {appReducerAction} from '../reducers/appReducer'
import {actions} from './actions'

export const registration = (email: string, password: string) => {
    return async (dispatch: any) => {
        await instance.post('auth/registration/', {
            email,
            password
        }).then(response =>
            dispatch(userReducerAction.setRegistration())
        ).catch(e => {
                dispatch(appReducerAction
                    .addError(
                        {
                            type: 'reg',
                            text: e.response.data.message
                        }))
            }
        )
    }

}
export const submitUser = (hash: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(actions.app.showLoader())
            const response = await instance.get(`auth/submit?${hash}`)
            localStorage.setItem('token', response.data.token)
            dispatch(userReducerAction.setUser(response.data))
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(actions.app.hideLoader())
        }


    }

}
export const login = (email: string, password: string) => {
    return async (dispatch: any) => {
        await instance.post('auth/login', {
            email,
            password
        }).then(response => {
            localStorage.setItem('token', response.data.token)
            dispatch(userReducerAction.setUser(response.data))
        }).catch(e => {
                dispatch(appReducerAction
                    .addError({type: 'log', text: e.response.data.message}))
            }
        )
    }

}
export const auth = () => {
    return async (dispatch: any) => {
        await instance.get('auth/auth',
            {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then(response => {
                dispatch(userReducerAction.setUser(response.data))
                localStorage.setItem('token', response.data.token)
            })
            .catch(e => {
                console.log(e)
                localStorage.removeItem('token')
            })
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

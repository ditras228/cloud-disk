import {InferActionsTypes} from './index'

const defaultState = {
    currentUser: {},
    isMobile: false,
    isAuth: false,
    isRegSuccess: false
}
export default function userReducer(state = defaultState, action: userReducerActionType) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                currentUser: action.payload.user,
                isAuth: true
            }
        case 'ADD_AVATAR':
            return {
                ...state,
                currentUser: {...state.currentUser, avatar: action.payload.avatar},
                isAuth: true
            }
        case 'SET_MOBILE':
            return {
                ...state,
                isMobile: action.payload
            }
        case 'LOGOUT':
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false,
            }
        case 'SET_REGISTRATION_SUCCESS':
            return {
                ...state,
                isRegSuccess: true
            }
        default:
            return state
    }
}
export const userReducerAction = {
    setUser: (user: any)  => ({type: 'SET_USER', payload: user} as const),
    addAvatar: (avatar: any)  => ({type: 'ADD_AVATAR', payload: avatar} as const),
    setMobile: (mobile: any)  => ({type: 'SET_MOBILE', payload: mobile} as const),
    logOut: () => ({type: 'LOGOUT'} as const),
    setRegistration: () => ({type: 'SET_REGISTRATION_SUCCESS'} as const)
}
export type userReducerActionType = InferActionsTypes<typeof userReducerAction>

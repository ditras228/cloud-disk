import {InferActionsTypes} from './index'

const defaultState = {
    currentUser: {},
    isAuth: false
}
export default function userReducer(state = defaultState, action: userReducerActionType) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                currentUser: action.payload.user,
                isAuth: true
            }
        case 'LOGOUT':
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false,
            }
        default:
            return state
    }
}
export const userReducerAction = {
    setUser: (user: any)  => ({type: 'SET_USER', payload: user} as const),
    logOut: () => ({type: 'LOGOUT'} as const)
}
export type userReducerActionType = InferActionsTypes<typeof userReducerAction>

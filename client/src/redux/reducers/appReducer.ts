import {InferActionsTypes} from './index'

const defaultState = {
    loader: true,
    error: '',
    toasts: []
}
export default function appReducer(state = defaultState, action:appReducerActionType) {
    switch (action.type) {
        case 'SHOW_LOADER':
            return {...state, loader: true}
        case 'HIDE_LOADER':
            return {...state, loader: false}
        case 'ERRORS':
            return {...state, error: action.payload}
        case 'ADD_TOAST':
            return {...state, toasts:  [...state.toasts, action.payload]}
        case 'REMOVE_TOAST':
            return {...state, toasts:  [...state.toasts.filter((toast: any) => toast.title ==action.payload)]}
        default:
            return state
    }
}
export const appReducerAction = {
    showLoader: () => ({type: 'SHOW_LOADER'} as const),
    hideLoader: () => ({type: 'HIDE_LOADER'} as const),
    error: (error:string) => ({type: 'ERRORS', payload: error} as const),
    addToast: (toast:any) => ({type: 'ADD_TOAST', payload: toast} as const),
    removeToast: (toastId:any) => ({type: 'REMOVE_TOAST', payload: toastId} as const),
}
export type appReducerActionType = InferActionsTypes<typeof appReducerAction>

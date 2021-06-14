import {InferActionsTypes} from './index'

const defaultState = {
    loader: true,
    errors: [],
    toasts: [],
    regModal: false,
}
export default function appReducer(state = defaultState, action:appReducerActionType) {
    switch (action.type) {
        case 'SHOW_LOADER':
            return {...state, loader: true}
        case 'HIDE_LOADER':
            return {...state, loader: false}
        case 'ADD_ERROR':
            return {...state, errors: [...state.errors, action.payload]}
        case 'ADD_TOAST':
            return {...state, toasts:  [...state.toasts, action.payload]}
        case 'REMOVE_TOAST':
            return {...state, toasts:  [...state.toasts.filter((toast: any) => toast.title===action.payload)]}
        case 'SHOW_REG_MODAL':
            return {...state, regModal: action.payload}
        default:
            return state
    }
}
export const appReducerAction = {
    showLoader: () => ({type: 'SHOW_LOADER'} as const),
    hideLoader: () => ({type: 'HIDE_LOADER'} as const),
    addError: (error:any) => ({type: 'ADD_ERROR', payload: error} as const),
    addToast: (toast:any) => ({type: 'ADD_TOAST', payload: toast} as const),
    removeToast: (toastId:any) => ({type: 'REMOVE_TOAST', payload: toastId} as const),
    isShowRegModal: (value:boolean) => ({type: 'SHOW_REG_MODAL', payload: value} as const),
}
export type appReducerActionType = InferActionsTypes<typeof appReducerAction>

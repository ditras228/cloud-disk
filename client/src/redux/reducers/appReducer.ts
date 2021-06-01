import {InferActionsTypes} from './index'

const defaultState = {
    loader: false,
    error: ''
}
export default function appReducer(state = defaultState, action:appReducerActionType) {
    switch (action.type) {
        case 'SHOW_LOADER':
            return {...state, loader: true}
        case 'HIDE_LOADER':
            return {...state, loader: false}
        case 'ERRORS':
            return {...state, error: action.payload}
        default:
            return state
    }
}
export const appReducerAction = {
    showLoader: () => ({type: 'SHOW_LOADER'} as const),
    hideLoader: () => ({type: 'HIDE_LOADER'} as const),
    error: (error:string) => ({type: 'ERRORS', payload: error} as const),
}
export type appReducerActionType = InferActionsTypes<typeof appReducerAction>

import {InferActionsTypes} from './index'

const defaultState = {
    loader: false
}
export default function appReducer(state = defaultState, action:appReducerActionType) {
    switch (action.type) {
        case 'SHOW_LOADER':
            return {...state, loader: true}
        case 'HIDE_LOADER':
            return {...state, loader: false}
        default:
            return state
    }
}
export const appReducerAction = {
    showLoader: () => ({type: 'SHOW_LOADER'} as const),
    hideLoader: () => ({type: 'HIDE_LOADER'} as const)
}
export type appReducerActionType = InferActionsTypes<typeof appReducerAction>

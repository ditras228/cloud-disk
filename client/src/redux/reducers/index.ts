import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import userReducer from './userReducer'
import fileReducer from './fileReducer'
import appReducer from './appReducer'
import uploadReducer from './uploadReducer'

const rootReducer=combineReducers({
    user: userReducer,
    file: fileReducer,
    app: appReducer,
    uploader: uploadReducer
})
export type RootReducerType  =typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type AppDispatch = typeof store.dispatch
type PropertiesType<T> = T extends {[key: string]: infer U} ? U: never
export type InferActionsTypes
    <T extends {[key: string]: (...args: any[])=> any}> = ReturnType<PropertiesType<T>>
export const store= createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

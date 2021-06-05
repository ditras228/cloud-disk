import {fileReducerAction} from '../reducers/fileReducer'
import {uploadReducerActions} from '../reducers/uploadReducer'
import {userReducerAction} from '../reducers/userReducer'
import {appReducerAction} from '../reducers/appReducer'

export const actions={
    file: fileReducerAction,
    app: appReducerAction,
    upload: uploadReducerActions,
    user: userReducerAction
}
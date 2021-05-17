import {InferActionsTypes} from './index'
import {appReducerAction} from './appReducer'

const defaultState = {
    files: [] as Array<IFile>,
    currentDir: null as string | null,
    dirStack: [] as Array<string>
}

export default function fileReducer(state = defaultState, action:fileReducerActionType) {

    switch (action.type) {
        case 'SET_FILES':
            return {...state, files: action.payload}
        case 'SET_CURRENT_DIR':
            return {...state, currentDir: action.payload}
        case 'ADD_FILE':
            return {...state, files: [...state.files, action.payload]}
        case 'PUSH_TO_STACK':
            return {...state, dirStack: [...state.dirStack, action.payload]}
        case 'DELETE_FILE':
            return {...state, files: [...state.files.filter(file => file._id != action.payload)]}
        default:
            return state
    }
}
export const fileReducerAction = {
    setFiles: (files: Array<IFile>) => ({type: 'SET_FILES', payload: files} as const),
    setCurrentDir: (dir: string) => ({type: 'SET_CURRENT_DIR', payload: dir} as const),
    addFile: (file: IFile) => ({type: 'ADD_FILE', payload: file} as const),
    pushToStack: (dir: string) => ({type: 'PUSH_TO_STACK', payload: dir} as const),
    deleteFileAction: (dirId: number) => ({type: 'DELETE_FILE', payload: dirId} as const)
}

export type fileReducerActionType = InferActionsTypes<typeof fileReducerAction>

type IFile = {
    _id: number
    name: string
    type: string
    accessLink: string
    size: number
    path: string
    data: string
    parent: string
    childs: string
}
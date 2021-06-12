import {InferActionsTypes} from './index'
import {IFile} from '../../types/types'

const defaultState = {
    files: [] as Array<IFile>,
    currentDir: null as IFile | null,
    dirStack: [{
        _id: 0,
        name: 'Мой диск'
    } as unknown as IFile] as Array<IFile>,
    hand: null as any,
    dropTo: null as string | null,
    thisFile: null as IFile | null,
    isShare: false as boolean,
    target: null as any
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
        case 'REMOVE_FROM_STACK':
            return {...state, dirStack: [...state.dirStack.filter((file, index)=>
                                        index<= action.payload || index==0 ) ],
                              currentDir: state.dirStack[action.payload]}
        case 'POP_STACK':
            return {...state, dirStack: [...state.dirStack.filter((file, index)=>
                    index!=state.dirStack.length-1 || index===0)],
                currentDir: state.dirStack[state.dirStack.length-2]}
        case 'DELETE_FILE':
            return {...state, files: [...state.files.filter(file => file._id !== action.payload)]}
        case 'SET_HAND':
            return {...state,  hand: action.payload}
        case 'DROP_TO_FOLDER':
            return {...state,  dropTo: action.payload}
        case 'UN_DROP_TO_FOLDER':
            return {...state,  dropTo: null}
        case 'SET_THIS_FILE':
            return {...state,  thisFile: action.payload}
        case 'IS_SHARE':
            return {...state,  isShare: action.payload}
        case 'SET_TARGET':
            return {...state,  target: action.payload}
        default:
            return state
    }
}
export const fileReducerAction = {
    setFiles: (files: Array<IFile>) => ({type: 'SET_FILES', payload: files} as const),
    setCurrentDir: (dir: IFile) => ({type: 'SET_CURRENT_DIR', payload: dir} as const),
    addFile: (file: IFile) => ({type: 'ADD_FILE', payload: file} as const),
    pushToStack: (dir: IFile) => ({type: 'PUSH_TO_STACK', payload: dir} as const),
    popStack: () => ({type: 'POP_STACK'} as const),
    removeFromStack: (num: number) => ({type: 'REMOVE_FROM_STACK', payload: num} as const),
    deleteFileAction: (dirId: string) => ({type: 'DELETE_FILE', payload: dirId} as const),
    setHand: (file: any) => ({type: 'SET_HAND', payload: file} as const),
    dropToFolder: (fileId: string) => ({type: 'DROP_TO_FOLDER', payload: fileId} as const),
    unDropToFolder: () => ({type: 'UN_DROP_TO_FOLDER'} as const),
    setThisFile: (file: IFile) => ({type: 'SET_THIS_FILE', payload: file} as const),
    isShare: (value: boolean) => ({type: 'IS_SHARE', payload: value} as const),
    setTarget: (file: any) => ({type: 'SET_TARGET', payload: file} as const),
}

export type fileReducerActionType = InferActionsTypes<typeof fileReducerAction>


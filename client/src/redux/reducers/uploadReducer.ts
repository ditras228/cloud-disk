import {InferActionsTypes} from './index'

const defaultState = {
    isVisible: false,
    UploadFilesByDrop: true,
    files: []
}
export default function uploadReducer(state = defaultState, action: UploadReducerActionType) {
    switch (action.type) {
        case 'UPLOAD_FILES_BY_DROP':
            return {...state, UploadFilesByDrop: action.payload }
        case 'SHOW_UPLOADER':
            return {...state, isVisible: true}
        case 'HIDE_UPLOADER':
            return {...state, isVisible: false, files: []}
        case 'ADD_UPLOAD_FILES':
            return {...state, files: [...state.files, action.payload]}
        case 'REMOVE_UPLOAD_FILES':
            return {...state,   files: []}
        case 'CHANGE_UPLOAD_PROGRESS':
            return {...state,
            files: [...state.files.map((file: any)=> file.id === action.payload.id
                ?{...file, progress: action.payload.progress}
                :{...file}
            )]
            }
        default:
            return state
    }
}
export const uploadReducerActions = {
    showUploader: () => ({type: 'SHOW_UPLOADER'} as const),
    hideUploader: () => ({type: 'HIDE_UPLOADER'} as const),
    addUploadFiles: (file: { name: any; progress: number; id: any }) => ({type: 'ADD_UPLOAD_FILES', payload: file} as const),
    removeUploadFiles: () => ({type: 'REMOVE_UPLOAD_FILES'} as const),
    changeUploadProgress: (file: any) => ({type: 'CHANGE_UPLOAD_PROGRESS',  payload: file} as const),
    byDrop: (bool: boolean) => ({type: 'UPLOAD_FILES_BY_DROP',  payload: bool} as const),
}

export type UploadReducerActionType = InferActionsTypes<typeof uploadReducerActions>


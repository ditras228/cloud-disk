import {InferActionsTypes} from './index'

const defaultState = {
    isVisible: false,
    UploadFilesByDrop: true,
    files: []
}
export default function uploadReducer(state = defaultState, action: UploadReducerActionType) {
    switch (action.type) {
        case 'UPLOAD_FILES_BY_DROP_ON':
            return {...state, UploadFilesByDrop: true }
        case 'UPLOAD_FILES_BY_DROP_OFF':
            return {...state, UploadFilesByDrop: false }
        case 'SHOW_UPLOADER':
            return {...state, isVisible: true}
        case 'HIDE_UPLOADER':
            return {...state, isVisible: false}
        case 'ADD_UPLOAD_FILES':
            return {...state, files: [...state.files, action.payload]}
        case 'REMOVE_UPLOAD_FILES':
            return {...state, isVisible: true}
        case 'CHANGE_UPLOAD_PROGRESS':
            return {...state,
            files: [...state.files.map((file: any)=> file.id == action.payload.id
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
    addUploadFiles: (file: any) => ({type: 'ADD_UPLOAD_FILES', payload: file} as const),
    removeUploadFiles: (fileId: number) => ({type: 'REMOVE_UPLOAD_FILES',  payload: fileId} as const),
    changeUploadProgress: (file: any) => ({type: 'CHANGE_UPLOAD_PROGRESS',  payload: file} as const),
    uploadFilesByDropON: (file: any) => ({type: 'UPLOAD_FILES_BY_DROP_ON',  payload: file} as const),
    uploadFilesByDropOFF: (file: any) => ({type: 'UPLOAD_FILES_BY_DROP_OFF',  payload: file} as const),
}

export type UploadReducerActionType = InferActionsTypes<typeof uploadReducerActions>


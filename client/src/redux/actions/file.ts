import {baseURL, instance} from '../../components/api/api'
import {fileReducerAction, fileReducerActionType} from '../reducers/fileReducer'
import {appReducerAction, appReducerActionType} from '../reducers/appReducer'
import {BaseThunkType} from '../reducers'
import {uploadReducerActions} from '../reducers/uploadReducer'

export const getFiles = (dirId: any, sort: string | null): fileThunkType  => {
    return async dispatch => {
        try {
            // @ts-ignore
            dispatch(appReducerAction.showLoader())
            let url = '/files'
            if (dirId)
                url = `/files?parent=${dirId}`
            if (sort)
                url = `/files?sort=${sort}`
            if (dirId && sort)
                url = `/files?parent=${dirId}?sort=${sort}`

            const response = await instance.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(fileReducerAction.setFiles(response.data))
        } catch (e) {
            console.log(e)
        } finally {
            // @ts-ignore
            dispatch(appReducerAction.hideLoader())
        }
    }
}
export const createDir = (dirId: string, name: string): fileThunkType => {
    return async dispatch => {
        const response = await instance.post(`/files`,
            {
                name,
                parent: dirId,
                type: 'dir'
            },
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
        dispatch(fileReducerAction.addFile(response.data))
    }
}

export function uploadFile(file: any, dirId: string): fileThunkType {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const uploadFile = {name: file.name, progress: 0, id: Date.now()}
            // @ts-ignore
            dispatch(uploadReducerActions.showUploader())
            // @ts-ignore
            dispatch(uploadReducerActions.addUploadFiles(uploadFile))
            const response = await instance.post('/files/upload', formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length')
                    console.log('total', totalLength)
                    if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(progress)
                        // @ts-ignore
                        dispatch(uploadReducerActions.changeUploadProgress({...uploadFile, progress}))
                    }
                }
            })
            dispatch(fileReducerAction.addFile(response.data))
        } catch (e) {
            console.log(e)
        }
    }

}

export async function downloadFile(file: any) {
    const response = await fetch(`${baseURL}/api/files/download?id=${file._id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}

export function deleteFile(file: any): fileThunkType {
    return async dispatch => {
        try {
            const response = await instance.delete(`/files?id=${file._id}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            })
            dispatch(fileReducerAction.deleteFileAction(file._id))
            alert(response.data.message)
        } catch (e) {
            console.log(e)
        }
    }
}

export function searchFiles(search: any ): fileThunkType | appThunkType {
    return async dispatch => {
        try {
            const response = await instance.get(`/files/search?search=${search}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            })
            dispatch(fileReducerAction.setFiles(response.data))
        } catch (e) {
            console.log(e)
        } finally {
            // @ts-ignore
            dispatch(appReducerAction.hideLoader())
        }
    }
}

type fileThunkType = BaseThunkType<fileReducerActionType>
type appThunkType = BaseThunkType<appReducerActionType>

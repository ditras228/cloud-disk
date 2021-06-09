import {baseURL, instance} from '../../components/api/api'
import {actions} from './actions'
import {IFile} from '../../types/types'
export const getFiles = (dirId: any, sort: string | null) => {
    return async (dispatch: any)  => {
        try {
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
            dispatch(actions.file.setFiles(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}
export const createDir = (dirId: string, name: string) => {
    return async (dispatch: any)  => {
        const response = await instance.post(`/files`,
            {
                name,
                parent: dirId,
                type: 'dir'
            },
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
        dispatch(actions.file.addFile(response.data))
    }
}
export function uploadFile(files: Array<any> , dirId: string){
    return async (dispatch: any)  => {
        try {
            let uploadFile: IFile | { name: any; progress: number; id: any }[]= []

            const formData = new FormData()
            for(let i =0; i<files.length; i++){
               formData.append('file', files[i])
               formData.append('webkitRelativePath',  files[i].webkitRelativePath)
               uploadFile.push({name: files[i].name, progress: 0, id: i})
               dispatch(actions.upload.addUploadFiles(uploadFile[i]))
            }

            if (dirId) {
                formData.append('parent', dirId)
            }

            dispatch(actions.upload.showUploader())

            const response = await instance.post('/files/upload', formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},


                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length')
                    console.log('total', totalLength)
                    if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(progress)
                        dispatch(actions.upload.changeUploadProgress({...uploadFile, progress}))
                    }
                }
            })
            response.data.forEach((file: any)=>{
                dispatch(actions.file.addFile(file))

            })
        } catch (e) {
            console.log(e)
        }
    }

}
export function dropTo(file: IFile, folderId: string) {
    return async (dispatch: any) => {
        try{
            const response= await instance.post(`/files/dropTo`,
                {
                    fileId: file._id,
                    folderId: folderId
                },
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
            dispatch(actions.file.deleteFileAction(file._id))
            console.log(response)
        }catch(e){
            console.log(e)
    }

}}
export  function downloadFile(file: any) {
    return async (dispatch: any) => {
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
}
export function deleteFile(file: any) {
    return async (dispatch: any)  => {
        try {
            let response: any
            if (file.type === 'dir') {
                response = await instance.delete(`/files/delFol?id=${file._id}`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                })
            } else {
                response = await instance.delete(`/files?id=${file._id}`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                })
            }
            dispatch(actions.file.deleteFileAction(file._id))
            alert(response.data.message)
        } catch (e) {
            console.log(e)
        }
    }
}

export function searchFiles(search: any) {
    return async (dispatch: any)  => {
        try {
            const response = await instance.get(`/files/search?search=${search}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            })
            dispatch(actions.file.setFiles(response.data))
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(actions.app.hideLoader())
        }
    }
}
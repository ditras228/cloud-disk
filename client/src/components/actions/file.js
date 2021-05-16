import {baseURL, instance} from "../api/api";
import {addFile, setFiles} from "../../reducers/fileReducer";

export const getFiles = (dirId) => {
    return async dispatch => {
        const response = await instance.get(`/files${dirId ? `?parent=${dirId}` : ''}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        console.log(response.data)
        dispatch(setFiles(response.data))
    }
}
export const createDir = (dirId, name) => {
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
        console.log(localStorage.getItem('token'))
        console.log(response.data)
        dispatch(addFile(response.data))
    }
}

export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const response = await instance.post('/files/upload', formData,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(progress)
                    }
                }
            })
            dispatch(addFile(response.data))
        } catch (e) {
            console.log(e)
        }
    }

}
export async function downloadFile(file){
    const response = await  fetch(`${baseURL}/files/download?id=${file._id}`, {
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if(response.status === 200){
        const blob = await response.blob()
        const downloadUrl= window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download=file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}
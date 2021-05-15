import {instance} from "../api/api";
import {addFile, setFiles} from "../../reducers/fileReducer";

export const getFiles = (dirId)=>{
    return async dispatch =>{
        const response = await instance.get(`/files${dirId ? `?parent=${dirId}`: ''}`,{
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

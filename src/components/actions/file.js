import {instance} from "../api/api";

export const getFiles = (dirId)=>{
    return async dispatch =>{
        const response = instance.get(`/files${dirId ? `parent=${dirId}`: ''}`,{
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }
}

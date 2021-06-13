import {IUser} from '../models/User'

export interface IReq {
    headers: {
        authorization: string,
    }
    user: IUser,
    static: string
    filePath: string
    body:{
        email: string
        password:string
        webkitRelativePath: string
        path: string
        isShare: boolean

        folderId: string,
        fileId: string
    }
    query: {
        sort: string
        parent: string
        id: number
        search: string
        hash: string
    }
    files: any
}
export interface IRes {
    status: any
    send: any
    json: any
    download: any
    header: any

}

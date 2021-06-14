export interface IFile {
    _id: string
    name: string
    type: string
    accessLink: string
    size: number
    path: string
    data: string
    parent: string
    childs: string
    isShare: boolean
}
export interface IFileFC{
    props:any
    file: IFile
    fade: boolean
    index?: string
}
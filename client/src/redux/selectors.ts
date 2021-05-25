export const IsAuth = (state: any) =>{
    return state.user.isAuth
}
export const CurrentDir = (state: any) =>{
    return state.file.currentDir
}
export const Files =(state: any)=>{
    return  state.file.files
}
export const DirStack = (state: any)=>{
    return state.file.dirStack
}
export const Loader = (state: any)=>{
    return state.app.loader
}
export const IsVisible = (state: any)=>{
    return state.uploader.isVisible
}
export const UploaderFiles = (state: any)=>{
    return state.uploader.files
}
export const GetUser = (state: any)=>{
    return state.user
}
export const GetIsMobile = (state: any)=>{
    return state.user.isMobile
}

export const GetUploadFilesByDrop = (state: any)=>{
    return state.uploader.UploadFilesByDrop
}

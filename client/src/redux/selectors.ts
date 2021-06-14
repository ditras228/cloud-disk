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
export const GetError = (state: any, type: string)=>{
    return state.app.errors.find((err: any)=>err.type===type)
}
export const GetHand = (state: any)=>{
    return state.file.hand
}
export const GetDirStack = (state: any)=>{
    return state.file.dirStack
}
export const GetDropTo = (state: any)=>{
    return state.file.dropTo
}
export const GetThisFile = (state: any)=>{
    return state.file.thisFile
}
export const GetIsShare = (state: any)=>{
    return state.file.isShare
}
export const GetRegSuccess = (state: any)=>{
    return state.user.isRegSuccess
}
export const GetTarget = (state: any)=>{
    return state.file.target
}
export const GetToasts = (state: any)=>{
    return state.app.toasts
}
export const GetShowRegModal = (state: any)=>{
    return state.app.regModal
}

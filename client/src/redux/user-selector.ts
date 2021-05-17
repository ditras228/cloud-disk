export const IsAuth = (state: any) =>{
    return state.user.isAuth
}
export const CurrentDir = (state: any) =>{
    return state.file.currentDir
}
export const Files =(state: any)=>{
    return  state.file.files
}
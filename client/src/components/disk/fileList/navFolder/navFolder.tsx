import React from 'react'
import {IFile} from '../../../../types/types'

const NavFolder: React.FC<any>  = (files: Array<IFile>) => {
    return (
        <div>

            {files.map(file=>
            <Folder file={file}/>
            )}
        </div>
    )
}

const Folder: React.FC<FolderProps>  = ({file}) => {
    return (
        <div>
            {file.name}
        </div>
    )
}

export default NavFolder

type FolderProps={
    file: IFile
}
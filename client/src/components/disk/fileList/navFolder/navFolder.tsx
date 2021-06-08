import React, {useEffect} from 'react'
import {IFile} from '../../../../types/types'
import {Breadcrumb} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {GetDirStack} from '../../../../redux/selectors'

const NavFolder: React.FC<any>  = (files: Array<IFile>) => {
    const dirs = useSelector(state => GetDirStack(state)) as Array<IFile>

    return (
        <Breadcrumb>
            {
                dirs.map((dir: any, index: number) => <Breadcrumb.Item key={index} href="#">{dir.name}</Breadcrumb.Item>)
            }
        </Breadcrumb>)
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
import React from 'react'
import {IFile} from '../../../../types/types'
import {Breadcrumb} from 'react-bootstrap'

const NavFolder: React.FC<any>  = (files: Array<IFile>) => {
    return (
        <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                Library
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>
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
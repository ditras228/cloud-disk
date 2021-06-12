import React from 'react'
import {IFile} from '../../../../types/types'
import {Breadcrumb} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {GetDirStack} from '../../../../redux/selectors'
import FileFC from '../file/File'

const NavFolder: React.FC<any>  = () => {
    const dirs = useSelector(state => GetDirStack(state)) as Array<IFile>

    return (
        <Breadcrumb>
            {
                dirs.map((dir: any, index: number) =>
                   <FileFC key={index}
                           loader={true}
                           file={dir}
                           isNav={true}
                           view={''}
                   />)
            }
        </Breadcrumb>)
}
export default NavFolder
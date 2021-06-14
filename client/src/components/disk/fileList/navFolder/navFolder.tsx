import React from 'react'
import {IFile} from '../../../../types/types'
import {Breadcrumb} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {GetDirStack} from '../../../../redux/selectors'
import FileFC from '../file/File'

const NavFolder  = () => {
    const dirs = useSelector(state => GetDirStack(state)) as Array<IFile>

    return (
        <Breadcrumb>
            {
                dirs.map((dir: any, index: number) =>
                   <FileFC key={index}
                           loader={true}
                           file={dir}
                           view={'navFolder'}
                           index={index}
                   />)
            }
        </Breadcrumb>)
}
export default NavFolder
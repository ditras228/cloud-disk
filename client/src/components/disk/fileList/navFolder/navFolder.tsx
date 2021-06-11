import React, {useEffect} from 'react'
import {IFile} from '../../../../types/types'
import {Breadcrumb, Container} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {GetDirStack, GetTarget} from '../../../../redux/selectors'
import {actions} from '../../../../redux/actions/actions'

const NavFolder: React.FC<any>  = (files: Array<IFile>) => {
    const dirs = useSelector(state => GetDirStack(state)) as Array<IFile>
    const dispatch=useDispatch()
    const target = useSelector(state =>GetTarget(state))

    function dragOverHandler(e: any) {
        e.preventDefault()
        e.stopPropagation()
        e.currentTarget.style.border='2px solid gray'
        dispatch(actions.file.setTarget(e.currentTarget))
    }

    function dragLeaveHandler(e: any) {
        e.currentTarget.style.border='2px solid transparent'
        dispatch(actions.file.setTarget(null))
    }
    function dropHandler(e: any) {
        const fileId=target.getAttribute('fileId')
        const fileType=target.getAttribute('fileType')

        if(fileType==='dir' && target) {
            e.currentTarget.style.border = '2px solid transparent'
            dispatch(actions.file.dropToFolder(fileId))
        }else{
            dispatch(actions.file.unDropToFolder())
        }

    }
    return (
        <Breadcrumb>
            {
                dirs.map((dir: any, index: number) =>
                    <Breadcrumb.Item
                        key={index}
                        onDragOver={(e:any)=>dragOverHandler(e) }
                        onDragLeave={(e:any)=>dragLeaveHandler(e) }
                        onDrop={(e:any)=>dropHandler(e) }

                    >
                        {dir.name}
                    </Breadcrumb.Item>)
            }
        </Breadcrumb>)
}
export default NavFolder
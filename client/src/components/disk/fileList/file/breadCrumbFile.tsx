import React from 'react'
import {Breadcrumb} from 'react-bootstrap'
import {actions} from '../../../../redux/actions/actions'
import {useDispatch} from 'react-redux'

const BreadCrumbFile: React.FC<any> = ({props, file}) => {
    const dispatch = useDispatch()

    return (
        <Breadcrumb.Item
            onClick={() => props.openNavDirHandler()}
            onDragOver={(e:any)=>props.dragOverHandler(e) }
            fileId={file._id}
            fileType={file.type}
        >
            {file.name}
        </Breadcrumb.Item>
    )
}

export default BreadCrumbFile
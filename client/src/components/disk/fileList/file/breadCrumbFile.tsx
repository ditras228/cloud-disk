import React from 'react'
import {Breadcrumb} from 'react-bootstrap'
import classes from './File.module.css'
import {IFileFC} from '../../../../types/types'

const BreadCrumbFile: React.FC<IFileFC> = ({props, file}) => {

    return (
        <Breadcrumb.Item
            onClick={() => props.openNavDirHandler()}
            draggable={false}
            onDragOver={(e:any)=>props.dragOverHandler(e) }
            onDragLeave={(e:any)=>props.dragLeaveHandler(e) }
            onDrop={(e:any)=>props.dropHandler(e) }
            onDragEnd={(e:any)=>props.dragEndHandler(e) }
            className={classes.item}
            fileId={file._id}
            fileType={file.type}
        >
            {file.name}
        </Breadcrumb.Item>
    )
}

export default BreadCrumbFile


import React, {useState} from 'react'
import {Fade} from 'react-bootstrap'
import classes from './File.module.css'
import {FileEarmark, Folder} from 'react-bootstrap-icons'
import {useDispatch} from 'react-redux'
import {actions} from '../../../../redux/actions/actions'


const GridFile: React.FC<any> = ({props, file, fade}) => {
    const dispatch = useDispatch()

    const clickHandler=(e: any)=>{
        props.openDirHandler()
        dispatch(actions.file.setHand(e.currentTarget))
        dispatch(actions.file.setThisFile(file))
    }


    return (
        <Fade in={fade}>
            <div
                onClick={e=>clickHandler(e)}
                draggable={true}
                onDragOver={(e:any)=>props.dragOverHandler(e) }
                onDragLeave={(e:any)=>props.dragLeaveHandler(e) }
                onDragEnter={(e: any)=> props.dragEnter(e)}
                onDragStart={(e:any)=>props.dragStartHandler(e) }
                onDrop={(e:any)=>props.dropHandler(e) }
                onDragEnd={(e:any)=>props.dragEndHandler(e) }
                className={classes.item}
                fileId={file._id}
                fileType={file.type}
            >
                <div className={classes.body}>

                    <div className={classes.i}>
                        {
                            file.type === 'dir' ? <Folder/> : <FileEarmark/>
                        }
                    </div>
                    <div className={classes.name}>
                        {
                            file.type === 'dir'
                                ?  file.name.length >=8
                                ?props.getName(file.name).slice(0, 9) + '...'
                                : file.name
                                : props.getName(file.name)[0].length >=8
                                ?props.getName(file.name)[0].slice(0, 9) + '...'
                                :props.getName(file.name)
                        }
                    </div>
                </div>
            </div>
        </Fade>
    )
}

export default GridFile
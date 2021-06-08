import React, {useEffect, useState} from 'react'
import {Button, ButtonGroup, Card, Col, Container, Fade, InputGroup, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {deleteFile, downloadFile, dropTo} from '../../../../redux/actions/file'
import {CloudDownloadFill, FileEarmark, Folder, Link45deg, TrashFill} from 'react-bootstrap-icons'
import {IFile} from '../../../../types/types'
import {CurrentDir, GetHand} from '../../../../redux/selectors'
import sizeFormat from '../../../utils/sizeFormat'
import {actions} from '../../../../redux/actions/actions'
import classes from './File.module.css'
import 'react-dragswitch/dist/index.css'
export {}
const FileFC: React.FC<FileProps> = ({file, view}) => {
    const dispatch = useDispatch()
    const [fade, setFade] = useState(false)
    const [isOver, setIsOver] = useState(false)

    function openDirHandler() {
        if (file.type === 'dir') {
            dispatch(actions.file.pushToStack(file))
            dispatch(actions.file.setCurrentDir(file))
        }
    }

    function deleteClickHandler(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    function downloadClickHandler(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.stopPropagation()
        downloadFile(file)
    }

    function getName(name: string) {
        let newName: Array<string>
        if (file.type !== 'dir') {
            newName = name.split('.')
            return newName
        } else
            return name
    }
    setTimeout(()=>setFade(true), 0);
    if (view === 'grid') {
        return (
            <Fade in={fade}>
            <Card className={classes.item}>
                <div className={classes.body}>
                    <div className={classes.name}>
                        {
                            file.type === 'dir'
                                ? file.name
                                : getName(file.name)[0].slice(0, 9) + '...'
                        }
                    </div>
                    <div className={classes.i}>
                        {
                            file.type === 'dir' ? <Folder/> : <FileEarmark/>
                        }
                    </div>
                </div>

                <mark className={classes.mark}>
                    {
                        file.type === 'dir'
                            ? 'dir'
                            : getName(file.name)[1]
                    }
                </mark>

            </Card>
            </Fade>
        )
    }
    function dragOverHandler(e: any) {
        e.stopPropagation()

        e.currentTarget.style.border='2px solid gray'
        setIsOver(true)
        setTimeout(()=>{
            setIsOver(false)
        }, 20)

    }

    function dragLeaveHandler(e: any) {
        const fileId=e.currentTarget.getAttribute('fileId')
        const fileType=e.currentTarget.getAttribute('fileType')
        
        if(fileType==='dir' && isOver){
            e.currentTarget.style.border='2px solid transparent'
            dispatch(actions.file.dropToFolder(fileId))
        }
       

    }

    function dragStartHandler(e: any) {
        const target = e.currentTarget.style
        setTimeout(()=>{
            dispatch(actions.upload.byDrop(false))
            dispatch(actions.file.setHand(file))
            target.display='none'
        }, 0)
    }

    function dragEndHandler(e: any) {
        e.currentTarget.style.display='block'
        dispatch(actions.upload.byDrop(true))
        console.log('2')

    }

    return (
        <Fade in={fade}>
        <Container
            onClick={() => openDirHandler()}
            onMouseDown={(e: any)=>dispatch(actions.file.setHand(e.currentTarget))}
            draggable={true}
            onDragOver={(e:any)=>dragOverHandler(e) }
            onDragLeave={(e:any)=>dragLeaveHandler(e) }
            onDragStart={(e:any)=>dragStartHandler(e) }
            onDragEnd={(e:any)=>dragEndHandler(e) }
            className={classes.item_list}
            fileId={file._id}
            fileType={file.type}
        >

            <Row>
                <Col sm={1} style={{fontSize: 30}}>
                    {
                        file.type === 'dir' ? <Folder/> : <FileEarmark/>
                    }
                </Col>



                <Col style={{display: 'flex', alignItems: 'center'}} sm={5}>{file.name}</Col>
                <Col style={{display: 'flex', alignItems: 'center'}} sm={2}>{file.data.slice(0, 10)}</Col>
                <Col style={{display: 'flex', alignItems: 'center'}} sm={2}> {sizeFormat(file.size)}</Col>
                    <Col sm={2} className={classes.buttons} >
                        <ButtonGroup >
                            <Button onClick={e => deleteClickHandler(e)}>
                                <TrashFill/>
                            </Button>
                            <Button onClick={e => downloadClickHandler(e)}>
                                <CloudDownloadFill/>
                            </Button>
                            <Button onClick={e => downloadClickHandler(e)}>
                                <Link45deg/>
                            </Button>
                            </ButtonGroup>
                    </Col>
            </Row>
        </Container>
        </Fade>
    )
}

export default FileFC

type FileProps = {
    file: IFile,
    view: string
}
import React, {useState} from 'react'
import {
    Breadcrumb,
    Button,
    ButtonGroup,
    Card,
    Col,
    Container,
    Fade,
    OverlayTrigger,
    Row,
    Tooltip
} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {deleteFile, downloadFile} from '../../../../redux/actions/file'
import {CloudDownloadFill, FileEarmark, Folder, Link45deg, TrashFill} from 'react-bootstrap-icons'
import {IFile} from '../../../../types/types'
import sizeFormat from '../../../utils/sizeFormat'
import {actions} from '../../../../redux/actions/actions'
import classes from './File.module.css'
import {GetTarget} from '../../../../redux/selectors'

export {}
const FileFC: React.FC<FileProps> = ({file, view, loader, isNav}) => {
    const dispatch = useDispatch()
    const [fade, setFade] = useState(false)
    const target = useSelector(state =>GetTarget(state))

    function openDirHandler() {
        if (file.type === 'dir' && !loader) {
            dispatch(actions.file.pushToStack(file))
            dispatch(actions.file.setCurrentDir(file))
            console.log('WORKS')
        }
    }
    function openNavDirHandler(){
        dispatch(actions.file.removeFromStack())

    }
    function deleteClickHandler(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }
    function shareFile(e: React.MouseEvent<HTMLElement, MouseEvent>){
        e.stopPropagation()
        dispatch(actions.file.setThisFile(file))
        dispatch(actions.file.isShare(true))
    }
    function downloadClickHandler(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.stopPropagation()
        dispatch(downloadFile(file))
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

    if(isNav){
        return(
            <Breadcrumb.Item
                onClick={() => openNavDirHandler()}
                onMouseDown={(e: any)=>dispatch(actions.file.setHand(e.currentTarget))}
                onDragOver={(e:any)=>dragOverHandler(e) }
                onDragLeave={(e:any)=>dragLeaveHandler(e) }
                className={classes.item_list}
                fileId={file._id}
                fileType={file.type}
            >
                {file.name}
            </Breadcrumb.Item>
        )
    }
    if (view === 'grid') {
        return (
            <Fade in={fade}>
            <div
                onClick={() => openDirHandler()}
                onMouseDown={(e: any)=>{
                    dispatch(actions.file.setHand(e.currentTarget))
                    dispatch(actions.file.setThisFile(file))
                }
                }
                draggable={true}
                onDragOver={(e:any)=>dragOverHandler(e) }
                onDragLeave={(e:any)=>dragLeaveHandler(e) }
                onDragStart={(e:any)=>dragStartHandler(e) }
                onDrop={(e:any)=>dropHandler(e) }
                onDragEnd={(e:any)=>dragEndHandler(e) }
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
                                    ?getName(file.name).slice(0, 9) + '...'
                                    : file.name
                                : getName(file.name)[0].length >=8
                                    ?getName(file.name)[0].slice(0, 9) + '...'
                                    :getName(file.name)
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

            </div>
            </Fade>
        )
    }
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
        <Fade in={fade}>
        <Container
            onClick={() => openDirHandler()}
            onMouseDown={(e: any)=>dispatch(actions.file.setHand(e.currentTarget))}
            draggable={true}
            onDragOver={(e:any)=>dragOverHandler(e) }
            onDragLeave={(e:any)=>dragLeaveHandler(e) }
            onDragStart={(e:any)=>dragStartHandler(e) }
            onDrop={(e:any)=>dropHandler(e) }
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
                            <OverlayTrigger
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-trash`}>
                                       Удалить
                                    </Tooltip>
                                }
                            >
                            <Button
                                onClick={e => deleteClickHandler(e)}
                                variant={'outline-danger'}
                                >
                                <TrashFill/>
                            </Button>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-download`}>
                                        Скачать
                                    </Tooltip>
                                }
                            >
                                <Button
                                    onClick={e => downloadClickHandler(e)}
                                    variant={'outline-success'}
                                >
                                    <CloudDownloadFill/>
                                </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-download`}>
                                        Поделиться
                                    </Tooltip>
                                }
                            >
                                <Button
                                    onClick={e => shareFile(e)}
                                    variant={file.isShare?'outline-primary':'outline-dark'}
                                >
                                    <Link45deg/>
                                </Button>
                            </OverlayTrigger>

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
    view: string,
    loader: boolean,
    isNav: boolean
}
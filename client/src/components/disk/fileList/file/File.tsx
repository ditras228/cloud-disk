import React, {useEffect, useState} from 'react'
import {Button, ButtonGroup, Card, Col, Container, Fade, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {deleteFile, downloadFile} from '../../../../redux/actions/file'
import {CloudDownloadFill, FileEarmark, Folder, TrashFill} from 'react-bootstrap-icons'
import {IFile} from '../../../../types/types'
import {CurrentDir} from '../../../../redux/selectors'
import {fileReducerAction} from '../../../../redux/reducers/fileReducer'
import sizeFormat from '../../../utils/sizeFormat'
import classes from './File.module.css'

const FileFC: React.FC<FileProps> = ({id,file, view}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => CurrentDir(state))
    const [fade, setFade] = useState(false)
    let even

    function openDirHandler() {
        if (file.type === 'dir') {
            console.log(file)
            dispatch(fileReducerAction.pushToStack(currentDir))
            dispatch(fileReducerAction.setCurrentDir(file._id))
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
    if (view == 'grid') {
        return (
            <Fade in={fade}>
            <Card className={classes.item}>
                <div className={classes.body}>
                    <div className={classes.name}>
                        {
                            file.type == 'dir'
                                ? file.name
                                : getName(file.name)[0].slice(0, 9) + '...'
                        }
                    </div>
                    <div className={classes.i}>
                        {
                            file.type == 'dir' ? <Folder/> : <FileEarmark/>
                        }
                    </div>
                </div>

                <mark className={classes.mark}>
                    {
                        file.type == 'dir'
                            ? 'dir'
                            : getName(file.name)[1]
                    }
                </mark>

            </Card>
            </Fade>
        )
    }
    if(id%2){
        even = classes.item_list_2
    }else{
        even = classes.item_list
    }

    function dragOverHandler(e: any) {
        e.stopPropagation()
        e.currentTarget.style.border='2px solid gray'
    }

    function dragLeaveHandler(e: any) {
        e.currentTarget.style.border='2px solid transparent'

    }

    function dragStartHandler(e: any) {
        e.currentTarget.style.border='2px solid red'

    }

    function dragEndHandler(e: any) {
        e.currentTarget.style.border='2px solid transparent'


    }

    return (
        <Fade in={fade}>
        <Container
            onClick={() => openDirHandler()}
            onDragOver={(e:any)=>dragOverHandler(e) }
            onDragLeave={(e:any)=>dragLeaveHandler(e) }
            onDragStart={(e:any)=>dragStartHandler(e) }
            onDragEnd={(e:any)=>dragEndHandler(e) }
            className={'item'} draggable={true}>
            <Row>
                <Col sm={1} style={{fontSize: 30}}>
                    {
                        file.type == 'dir' ? <Folder/> : <FileEarmark/>
                    }
                </Col>
                <Col style={{display: 'flex', alignItems: 'center'}} sm={5}>{file.name}</Col>
                <Col style={{display: 'flex', alignItems: 'center'}} sm={2}>{file.data.slice(0, 10)}</Col>
                <Col style={{display: 'flex', alignItems: 'center'}} sm={2}> {sizeFormat(file.size)}</Col>
                    <Col sm={2}>
                        <ButtonGroup>
                            <Button onClick={e => deleteClickHandler(e)}>
                                <TrashFill/>
                            </Button>
                            <Button onClick={e => downloadClickHandler(e)}>
                                <CloudDownloadFill/>
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
    id:number,
    file: IFile,
    view: string
}
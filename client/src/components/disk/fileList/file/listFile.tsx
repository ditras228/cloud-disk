import React from 'react'
import {Button, ButtonGroup, Col, Container, Fade, OverlayTrigger, Row, Tooltip} from 'react-bootstrap'
import {actions} from '../../../../redux/actions/actions'
import classes from './File.module.css'
import {CloudDownloadFill, FileEarmark, Folder, Link45deg, TrashFill} from 'react-bootstrap-icons'
import sizeFormat from '../../../utils/sizeFormat'
import {useDispatch} from 'react-redux'

const ListFile: React.FC<any> = ({props, file, fade}) => {
    const dispatch = useDispatch()
    return (
        <Fade in={fade}>
            <Container
                onClick={() => props.openDirHandler()}
                onMouseDown={(e: any)=>dispatch(actions.file.setHand(e.currentTarget))}
                draggable={true}
                onDragOver={(e:any)=>props.dragOverHandler(e) }
                onDragLeave={(e:any)=>props.dragLeaveHandler(e) }
                onDragStart={(e:any)=>props.dragStartHandler(e) }
                onDrop={(e:any)=>props.dropHandler(e) }
                onDragEnd={(e:any)=>props.dragEndHandler(e) }
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
                    <Col style={{display: 'flex', alignItems: 'center'}} sm={2}>{file.data?.slice(0, 10)}</Col>
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
                                    onClick={e => props.deleteClickHandler(e)}
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
                                    onClick={e => props.downloadClickHandler(e)}
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
                                    onClick={e => props.shareFile(e)}
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

export default ListFile
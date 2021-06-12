import React from 'react'
import {Button, ButtonGroup, Col, Container, Fade, OverlayTrigger, Row, Tooltip} from 'react-bootstrap'
import classes from './File.module.css'
import {CloudDownloadFill, FileEarmark, Folder, Link45deg, TrashFill} from 'react-bootstrap-icons'
import sizeFormat from '../../../utils/sizeFormat'

const FooterFile: React.FC<any> = ({props, file, fade}) => {
    return (
        <Fade in={fade}>
            <Container
                className={classes.item_list}
            >

                <Row className={classes.row}>
                    <Col sm={1} style={{fontSize: 30}}>
                        {
                            file.type === 'dir' ? <Folder/> : <FileEarmark/>
                        }
                    </Col>
                    <Col style={{display: 'flex', alignItems: 'center'}} sm={6}>{file.name}</Col>
                    <Col style={{display: 'flex', alignItems: 'center'}} sm={3}> {sizeFormat(file.size)}</Col>
                    <Col sm={2} className={classes.buttons} >
                        <ButtonGroup >
                                <Button
                                    onClick={e => props.deleteClickHandler(e)}
                                    variant={'outline-danger'}
                                >
                                    <TrashFill/>
                                </Button>
                                <Button
                                    onClick={e => props.downloadClickHandler(e)}
                                    variant={'outline-success'}
                                >
                                    <CloudDownloadFill/>
                                </Button>
                                <Button
                                    onClick={e => props.shareFile(e)}
                                    variant={file.isShare?'outline-primary':'outline-dark'}
                                >
                                    <Link45deg/>
                                </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Container>
        </Fade>
    )
}

export default FooterFile
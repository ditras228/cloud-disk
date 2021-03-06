import React from 'react'
import {Button, ButtonGroup, Col, Container, Fade, Row} from 'react-bootstrap'
import classes from './File.module.css'
import {CloudDownloadFill, FileEarmark, Folder, Link45deg, TrashFill} from 'react-bootstrap-icons'
import {IFile} from '../../../../types/types'

const FooterFile: React.FC<FooterFileProps> = ({props, file, fade}) => {
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
                    <Col style={{display: 'flex', alignItems: 'center'}} sm={9}>{file.name}</Col>
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

type FooterFileProps={
    props: any
    file: IFile
    fade: boolean
}
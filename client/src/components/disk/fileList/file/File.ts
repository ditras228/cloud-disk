import React from 'react';
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../actions/file";
import {CloudDownloadFill, FileBinary, Folder, TrashFill} from 'react-bootstrap-icons';

const File = ({file, name, data, size, id, type}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)

    function openDirHandler() {
        if (type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(id))
        }
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    function downloadClickHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    return (
        <Container onClick={() => openDirHandler()} style={{marginBottom: 10}}>
            <Row>
                <Col sm={1} style={{fontSize: 30}}>
                    {
                        type=='dir'? <Folder/> : <FileBinary/>
                    }
                </Col>
                <Col style={{display: 'flex', alignItems: 'center'}} sm={5}>{name}</Col>
                <Col style={{display: 'flex', alignItems: 'center'}} sm={2}>{data.slice(0, 10)}</Col>
                <Col style={{display: 'flex', alignItems: 'center'}} sm={2}> {size}</Col>
                {type === 'dir'
                    ? <></>
                    :
                    <Col sm={2}>
                        <ButtonGroup>
                            <Button onClick={e => deleteClickHandler(e)}>
                                <TrashFill/>
                            </Button>
                            <Button onClick={e => downloadClickHandler(e)}>
                                <CloudDownloadFill/>
                            </Button>
                        </ButtonGroup>
                    </Col>}
            </Row>
        </Container>
    );
};

export default File;
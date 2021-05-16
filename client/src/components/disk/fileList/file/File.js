import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {downloadFile} from "../../../actions/file";

const File = ({file,name, data, size, id, type}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)

    function openDirHandler() {
        if (type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(id))
        }
    }

    function downloadHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    return (
        <Container onClick={() => openDirHandler()}>
            <Row>
                <Col sm={1}>
                    <img src="http://placehold.it/50" alt=""/>
                </Col>
                <Col style={{display: 'flex', alignItems: 'center'}}>{name}</Col>
                <Col style={{display: 'flex', alignItems: 'center'}} sm={3}>{data.slice(0, 10)}</Col>
                <Col style={{display: 'flex', alignItems: 'center'}} sm={3}> {size}</Col>
                {type==='dir'
                    ? <div></div>
                    :
                    <Button onClick={e=>downloadHandler(e)}> download</Button>}
            </Row>
        </Container>
    );
};

export default File;
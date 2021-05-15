import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";

const File = ({name, data, size,id, type}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state=> state.file.currentDir)
    function openDirHandler (){
        dispatch(pushToStack(currentDir))
        dispatch(setCurrentDir(id))

    }
    return (
            <Container onClick={()=>type === 'dir'?openDirHandler():''}>
            <Row>
                <Col sm={1}>
                    <img src="http://placehold.it/50" alt=""/>
                </Col>
                <Col  style={{display: 'flex',alignItems: 'center'}}>{name}</Col>
                <Col style={{display: 'flex',alignItems: 'center'}} sm={3}>{data.slice(0,10)}</Col>
                <Col style={{display: 'flex',alignItems: 'center'}} sm={3}> {size}</Col>
            </Row>
        </Container>
    );
};

export default File;
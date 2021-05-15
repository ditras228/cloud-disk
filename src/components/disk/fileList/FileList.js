import React, {useState} from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import File from "./file/File";
import {useSelector} from "react-redux";

const FileList = () => {
    const files = useSelector(state => state.file.files).map(file =>
        <File name={file.name}
              size={file.size}
              data={file.data}
              key={file._id}
              id={file._id}
              type={file.type}
        />)
    return (
        <Container>
            <Row>
                <Col sm={1}/>
                <Col>Название</Col>
                <Col sm={3}>Дата</Col>
                <Col sm={3}> Размер</Col>
            </Row>
            {files}
        </Container>

    );
};


export default FileList;
import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

const FileList = () => {
    return (
        <Container>
            <Row>
                <Col sm={1}/>
                <Col>Название</Col>
                <Col sm={3}>Дата</Col>
                <Col sm={3}> Размер</Col>
            </Row>
        </Container>
    );
};

export default FileList;
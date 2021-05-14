import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";

const File = () => {
    return (
            <Container>
            <Row>
                <Col sm={1}>
                    <img src="http://placehold.it/50" alt=""/>
                </Col>
                <Col  style={{display: 'flex',alignItems: 'center'}}>Название</Col>
                <Col style={{display: 'flex',alignItems: 'center'}} sm={3}>Дата</Col>
                <Col style={{display: 'flex',alignItems: 'center'}} sm={3}> Размер</Col>
            </Row>
        </Container>
    );
};

export default File;
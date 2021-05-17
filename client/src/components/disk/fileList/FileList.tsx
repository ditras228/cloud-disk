import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import File from "./file/File";
import {useSelector} from "react-redux";
import {Files} from '../../../redux/user-selector'

const FileList = () => {
    const files = useSelector(state => Files(state)).map((file: any)  =>
        <File name={file.name}
              size={file.size}
              data={file.data}
              key={file._id}
              id={file._id}
              file={file}
              type={file.type}
        />)
    if (files.length === 0) {
        return <h1>Папка пуста</h1>
    }
    return (
        <Container>
            <Card>
                <Card.Header style={{padding: '0.75rem 2.25rem'}}>
                    <Row>
                        <Col sm={1} style={{fontSize: 30}}>

                        </Col>
                        <Col sm={5} style={{display: 'flex', alignItems: 'center'}}>Название</Col>
                        <Col sm={2} style={{display: 'flex', alignItems: 'center'}}>Дата</Col>
                        <Col sm={2} style={{display: 'flex', alignItems: 'center'}}>Размер</Col>
                        <Col sm={2} style={{display: 'flex', alignItems: 'center'}}/>
                    </Row>
                </Card.Header>
                <Card.Body>
                    {files}
                </Card.Body>
            </Card>

        </Container>

    );
};


export default FileList;
import React from 'react'
import {Alert, Card, Col, Container, Row} from 'react-bootstrap'
import File from './file/File'
import {useDispatch, useSelector} from 'react-redux'
import {Files} from '../../../redux/selectors'
import classes from './FileList.module.css'
const FileList: React.FC<any> = ({view, setView}) => {
    const files = useSelector(state => Files(state)).map((file: any, index: number) =>
        <File key={index}
              id={index}
              file={file}
              view={view}
        />
    )
    if (files.length === 0) {
        return <Alert variant={'primary'}>Папка пуста</Alert>
    }

    if(view=='grid') {
        return (
            <div className={classes.body}>
                {files}
            </div>
        )
    } else
    return (
            <Card >
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
    )
}
export default FileList
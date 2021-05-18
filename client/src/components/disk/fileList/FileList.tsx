import React from 'react'
import {Card, Col, Container, Row} from 'react-bootstrap'
import File from './file/File'
import {useSelector} from 'react-redux'
import {Files} from '../../../redux/selectors'
import classes from './FileList.module.css'
const FileList: React.FC<any> = ({view}) => {
    const files = useSelector(state => Files(state)).map((file: any) =>
        <File key={file._id}
              file={file}
              view={view}
        />
    )

    if (files.length === 0) {
        return <h1>Папка пуста</h1>
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
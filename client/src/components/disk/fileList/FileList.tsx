import React from 'react'
import {Alert, Card, Col, Row} from 'react-bootstrap'
import File from './file/File'
import {useSelector} from 'react-redux'
import {Files, Loader} from '../../../redux/selectors'
import classes from './FileList.module.css'

const FileList: React.FC<IListProps> = ({view, loader}) => {

    const files = useSelector(state => Files(state))
        .map((file: any, index: number) =>
        <File key={index}
              file={file}
              view={view}
              loader={loader}
              isNav={false}
        />
    )

    if (files.length === 0) {
        return <Alert variant={'primary'}>Папка пуста</Alert>
    }
    if(view=== 'grid') {
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

type IListProps ={
    view: string,
    loader: boolean
}
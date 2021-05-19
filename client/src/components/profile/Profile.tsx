import React from 'react'
import {Card, Col, Container, Form, Row} from 'react-bootstrap'
import classes  from './Profile.module.css'
import {Upload} from 'react-bootstrap-icons'
import {useDispatch, useSelector} from 'react-redux'
import {uploadAvatar} from '../../redux/actions/user'
import {GetUser} from '../../redux/selectors'
import {baseURL} from '../api/api'
const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => GetUser(state))
    const avatar= `${baseURL}\\${user.avatar}`

    function fileUploadHandler(e: any){
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }
    return (
        <Container>
            <Card>
                <Card.Header>
                    Профиль
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <div className={classes.container}>
                                <img className={classes.avatar} src={avatar} alt=""/>
                                <div className={classes.overlay}>
                                    <Upload className={classes.text}/>
                                </div>
                                <Form.File
                                    id="custom-file-translate-scss"
                                    label="Загрузить файл"
                                    lang="ru"
                                    custom
                                    multiple={true} type="file" onChange={fileUploadHandler}
                                />
                            </div>
                        </Col>
                        <Col>
                            {user.name}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Profile
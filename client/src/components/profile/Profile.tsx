import React from 'react'
import {Card, Col, Container, Row} from 'react-bootstrap'
import classes  from './Profile.module.css'
import {Upload} from 'react-bootstrap-icons'
const Profile = () => {
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
                                <img className={classes.avatar} src="http://placehold.it/150" alt=""/>
                                <div className={classes.overlay}>
                                    <Upload className={classes.text}/>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            dude
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Profile
import React from 'react'
import {Card, Col, Container, Form, ListGroup, ProgressBar, Row} from 'react-bootstrap'
import classes  from './Profile.module.css'
import {Disc, DiscFill, Mailbox, Person, Upload} from 'react-bootstrap-icons'
import {useDispatch, useSelector} from 'react-redux'
import {uploadAvatar} from '../../redux/actions/user'
import {GetUser} from '../../redux/selectors'
import {baseURL} from '../api/api'
import sizeFormat from '../utils/sizeFormat'
const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => GetUser(state)).currentUser
    const diskPercent =  user.usedSpace/user.diskSpace*100

    let avatar= `${baseURL}/${user.avatar}`

    function fileUploadHandler(e: any){
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }
    if(avatar === `${baseURL}/undefined` ){
        avatar= 'http://placehold.it/300'
    }

    return (
        <Container style={{maxWidth: 900}}>
            <Card>
                <Card.Header>
                    Профиль
                </Card.Header>
                <Card.Body style={{padding: 50}}>
                        <div className={classes.grid}>
                                <label htmlFor="avatar_input">
                                    <div className={classes.container}>
                                        <img className={classes.image} src={avatar} alt=""/>
                                        <div className={classes.overlay}>
                                            <Upload className={classes.text}/>
                                        </div>
                                    </div>

                                </label>

                                <input
                                    id="avatar_input"
                                    lang="ru"
                                    multiple={true} type="file" accept={'image/*'} onChange={fileUploadHandler}
                                    className={classes.input}
                                />
                        <Col className={classes.desc}>
                                <div className={classes.title}>
                                    <div><Mailbox/> Почта</div>
                                    {user.email}
                                </div>
                                 <div className={classes.title}>
                                <div><Disc/> Место на диске</div>
                                     {sizeFormat(user.usedSpace)}
                                     /{sizeFormat(user.diskSpace)}
                                </div>
                                <ProgressBar  striped variant="success" now={diskPercent} />
                        </Col>
                        </div>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Profile
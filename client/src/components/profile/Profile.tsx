import React from 'react'
import {Button, Card, Col, Container, OverlayTrigger, ProgressBar, Row, Tooltip} from 'react-bootstrap'
import {Disc, Mailbox, TrashFill, Upload} from 'react-bootstrap-icons'
import {useDispatch, useSelector} from 'react-redux'
import {uploadAvatar} from '../../redux/actions/user'
import {GetUser} from '../../redux/selectors'
import {baseURL} from '../api/api'
import sizeFormat from '../utils/sizeFormat'
import classes from './Profile.module.css'

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
                <Card.Body className={classes.card}>
                        <div className={classes.grid}>
                                <label htmlFor="avatar_input" className={classes.label}>
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
                        <Col>
                                <div className={classes.row}>
                                    <div className={classes.title}><Mailbox className={classes.i}/> Почта</div>
                                    <div className={classes.desc}>{user.email}</div>
                                </div>
                                <div className={classes.row}>
                                    <div  className={classes.title}>
                                        <Disc className={classes.i}/> Место на диске
                                    </div>
                                    <div className={classes.desc}>{sizeFormat(user.usedSpace)}
                                     /{sizeFormat(user.diskSpace)}</div>
                                </div>


                            <OverlayTrigger
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-progress`}>
                                        {`${Math.round(diskPercent)}%`}
                                    </Tooltip>
                                }
                            >
                                <ProgressBar  striped variant="success" now={diskPercent} />
                            </OverlayTrigger>
                        </Col>
                        </div>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Profile
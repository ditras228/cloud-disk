import React from 'react'
import {Modal} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {GetShowRegModal} from '../../redux/selectors'
import {actions} from '../../redux/actions/actions'

const RegSuccess= () => {
    const show= useSelector(state=>GetShowRegModal(state))
    const dispatch=useDispatch()
    function hide(){
        dispatch(actions.app.isShowRegModal(false))
    }
    return (
        <Modal show={show} onHide={() =>hide()}>
            <Modal.Header closeButton>
                <Modal.Title>Регистрация завершена!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Спасибо, что зарегистрировались на MERNDisk
            </Modal.Body>
        </Modal>
    )
}

export default RegSuccess
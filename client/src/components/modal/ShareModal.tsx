import 'react-toggle/style.css'
import React from 'react'
import {Button, Modal} from 'react-bootstrap'
import {IFile} from '../../types/types'
import {GetIsShare, GetThisFile} from '../../redux/selectors'
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../redux/actions/actions'
import Toggle from 'react-toggle'
import classes from './ShareModal.module.css'

const ShareModal: React.FC<ShareModalProps> = () => {
    const thisFile = useSelector(state=>GetThisFile(state))
    const show = useSelector(state =>GetIsShare(state))
    const dispatch = useDispatch()

    const setShow = (value: boolean)=>{
        dispatch(actions.file.isShare(value))
    }
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className={classes.header}>
                        <Toggle
                            className={classes.toggle}
                            defaultChecked={false}
                            icons={false}
                            onChange={()=>{}} />
                        <span>Поделиться файлом</span>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button variant="outline-dark" disabled>{`${window.location.href}share?id=${thisFile?._id}`}</Button>
            </Modal.Body>
        </Modal>
    )
}
type ShareModalProps={
    file: IFile
}
export default ShareModal
import 'react-toggle/style.css'
import React, {useEffect} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {IFile} from '../../types/types'
import {GetIsShare, GetThisFile} from '../../redux/selectors'
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../redux/actions/actions'
import Toggle from 'react-toggle'
import classes from './ShareModal.module.css'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {shareFile} from '../../redux/actions/file'


const ShareModal: React.FC<ShareModalProps> = () => {
    const thisFile = useSelector(state=>GetThisFile(state)) as IFile
    const show = useSelector(state =>GetIsShare(state))
    const dispatch = useDispatch()
    const link= `${window.location.href}share?id=${thisFile?._id}`

    const setShow = (value: boolean)=>{
        dispatch(actions.file.isShare(value))
    }
    const isShareHandler = ()=>{
        dispatch(shareFile(thisFile))
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className={classes.header}>
                        <Toggle
                            className={classes.toggle}
                            defaultChecked={thisFile?.isShare}
                            icons={false}
                            onChange={()=>isShareHandler()} />
                        <span>Поделиться файлом</span>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <>
                <CopyToClipboard text={link}>
                    <Button variant="outline-dark" disabled={!thisFile?.isShare}>{link}</Button>
                </CopyToClipboard>
            </>
            </Modal.Body>
        </Modal>
    )
}
type ShareModalProps={
    file: IFile
}
export default ShareModal
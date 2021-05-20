import React from 'react'
import {Button, Card, Modal, ProgressBar} from 'react-bootstrap'
import classes from './Uploader.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {IsVisible, UploaderFiles} from '../../../redux/selectors'
import {uploadReducerActions} from '../../../redux/reducers/uploadReducer'

const Uploader = () => {
    const files = useSelector(state => UploaderFiles(state))
    const isVisible = useSelector(state => IsVisible(state))
    const dispatch = useDispatch()

    function closeModal(){
        dispatch(uploadReducerActions.hideUploader())
    }
    return (
        <Modal show={isVisible} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Загрузки</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    files.map((file: any) => <FileProgress file={file} key={file.id}/>
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={closeModal}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
type FileProgressProps={
    file: any
}
const FileProgress: React.FC<FileProgressProps> = ({file}) => {
    return (
        <Card>
            <Card.Header>
                {file.name}
            </Card.Header>
            <Card.Body>
                <ProgressBar  now={file.progress}  label={`${file.progress}%`} />
            </Card.Body>
        </Card>

    )
}
export default Uploader
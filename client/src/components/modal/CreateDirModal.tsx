import React, {useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'

 const CreateDirModal: React.FC<ICreateDirModalProps> = ({show, setShow, createDirHandler}) => {
    const [name, setName] = useState('')
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Создать папку</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control onChange={e => setName(e.target.value)}  placeholder="Введите название папки"/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {
                    createDirHandler(name)
                    setShow(false)
                }}>
                    ОК
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDirModal
type ICreateDirModalProps = {
    show: boolean
    setShow: any
    createDirHandler: (name: string)=>void
}
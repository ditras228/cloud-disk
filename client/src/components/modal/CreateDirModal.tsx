import React, {useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'

 const CreateDirModal: React.FC<ICreateDirModalProps> = ({show, setShow, createDirHandler}) => {
    const [name, setName] = useState('')

    const createDir = () =>{
        createDirHandler(name)
        setShow(false)
    }
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Создать папку</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            onChange={e => setName(e.target.value)}
                            placeholder="Введите название папки"
                            autoComplete={'off'}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary"
                        onClick={()=>createDir()}
                        disabled={!name}
                >
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
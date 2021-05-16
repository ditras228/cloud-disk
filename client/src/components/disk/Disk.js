import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createDir, getFiles, uploadFile} from "../actions/file";
import File from "./fileList/file/File";
import FileList from "./fileList/FileList";
import {Button, Container, Form, Modal} from "react-bootstrap";
import {setCurrentDir} from "../../reducers/fileReducer";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir= useSelector(state => state.file.currentDir)
    console.log('dir>'+currentDir)
    const [show, setShow] = useState(false)
    const dirStack = useSelector(state=> state.file.dirStack)
    useEffect(()=>{
       dispatch(getFiles(currentDir))
    }, [currentDir])

    function createDirHandler(name) {
        dispatch(createDir(currentDir, name))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }
    function fileUploadHandler(event){
        const files = [...event.target.files]
        files.forEach(file => {
            dispatch(uploadFile(file, currentDir))
        })
    }
    return (
        <>
            <Container style={{marginBottom: 20}}>
                <Button style={{marginRight: 10}} onClick={()=>backClickHandler()}>Назад</Button>
                <Button onClick={()=>setShow(true)}>Создать папку</Button>
                <input multiple={true} type="file" onChange={fileUploadHandler}/>
            </Container>
            <CreateDirModal show={show} setShow={setShow} createDirHandler={createDirHandler}/>

            <FileList/>
        </>
    );
};

const CreateDirModal = ({show, setShow, createDirHandler}) => {
    const [name, setName] = useState('')
    return (
        <Modal show={show} onHide={()=>setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Введите название папки</Form.Label>
                        <Form.Control onChange={e=> setName(e.target.value)} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e)=>{
                    createDirHandler(name)
                    setShow(false)
                }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default Disk;
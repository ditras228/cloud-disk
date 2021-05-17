import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createDir, getFiles, uploadFile} from "../actions/file";
import File from "./fileList/file/File";
import FileList from "./fileList/FileList";
import {Button, Container, Dropdown, Form, Modal, Spinner} from "react-bootstrap";
import {setCurrentDir} from "../../reducers/fileReducer";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)
    const [show, setShow] = useState(false)
    const dirStack = useSelector(state => state.file.dirStack)
    const loader = useSelector(state => state.app.loader)
    const [sort, setSort]= useState('type')

    useEffect(() => {
        dispatch(getFiles(currentDir,sort))
        console.log('sort')
    }, [currentDir, sort])

    function createDirHandler(name) {
        dispatch(createDir(currentDir, name))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => {
            dispatch(uploadFile(file, currentDir))
        })
    }
    if(loader==true){
        return (
            <Spinner animation="grow" />
        )
    }
    return (
        <>
            <Container style={{marginBottom: 20}}>
                <div style={{marginBottom: 10}}>
                    <Button style={{marginRight: 10}} onClick={() => backClickHandler()}>Назад</Button>
                    <Button style={{marginRight: 10}} onClick={() => setShow(true)}>Создать папку</Button>
                    <DropDownBtn setSort={setSort}/>
                </div>
                <Form>
                    <Form.File
                        id="custom-file-translate-scss"
                        label="Загрузить файл"
                        lang="ru"
                        custom
                        multiple={true} type="file" onChange={fileUploadHandler}
                    />
                </Form>
            </Container>
            <CreateDirModal show={show} setShow={setShow} createDirHandler={createDirHandler}/>

            <FileList/>
        </>
    );
};
const DropDownBtn = ({setSort}) => {
    return (
        <Dropdown style={{display: 'inline-block'}}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Сортирвка
            </Dropdown.Toggle>

            <Dropdown.Menu >
                <Dropdown.Item onSelect={()=> setSort('name')}>По имени</Dropdown.Item>
                <Dropdown.Item onSelect={()=> setSort('type')}>По типу</Dropdown.Item>
                <Dropdown.Item onSelect={()=> setSort('date')}>По дате</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
const CreateDirModal = ({show, setShow, createDirHandler}) => {
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
                <Button variant="primary" onClick={(e) => {
                    createDirHandler(name)
                    setShow(false)
                }}>
                    ОК
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default Disk;
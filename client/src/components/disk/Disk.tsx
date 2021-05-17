import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createDir, getFiles, uploadFile} from '../../redux/actions/file'
import FileList from './fileList/FileList'
import {Button, Col, Container, Dropdown, Form, Row, Spinner} from 'react-bootstrap'
import {fileReducerAction} from '../../redux/reducers/fileReducer'
import {CurrentDir, DirStack, Loader} from '../../redux/selectors'
import CreateDirModal from '../modal/CreateDirModal'
import {CloudUploadFill, Grid3x3GapFill, List} from 'react-bootstrap-icons'
import classes from './Disk.module.css'

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => CurrentDir(state))
    const [show, setShow] = useState(false)
    const dirStack = useSelector(state => DirStack(state))
    const loader = useSelector(state => Loader(state))
    const [sort, setSort] = useState('type')
    const [view, setView] = useState('list')
    const [dragEnter, setDragEnter] = useState(false)
    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
        console.log('sort')
    }, [currentDir, sort])

    function createDirHandler(name: string) {
        dispatch(createDir(currentDir, name))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(fileReducerAction.setCurrentDir(backDirId))
    }

    function fileUploadHandler(event: { target: { files: any } }) {
        const files = [...event.target.files]
        files.forEach(file => {
            dispatch(uploadFile(file, currentDir))
        })
    }

    if (loader == true) {
        return (
            <Spinner animation="grow"/>
        )
    }
    function dragEnterHandler(event: any){
        event.preventDefault()
        event.stopPropagination()
        setDragEnter(true)
    }
    function dragLeaveHandler(event: any){
        event.preventDefault()
        event.stopPropagination()
        setDragEnter(false)
    }
    function dropHandler(event: any){
        event.preventDefault()
        event.stopPropagination()
        let files = [...event.dataTransfer.files]
        files.forEach(file => {
            dispatch(uploadFile(file, currentDir))
        })
        setDragEnter(false)
    }
    return (!dragEnter ?
        <div  onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <Container style={{marginBottom: 20}}>
                    <Row>
                        <Col style={{marginBottom: 10}} sm={'auto'}>
                            <Button style={{marginRight: 10}} onClick={() => backClickHandler()}>Назад</Button>
                            <Button style={{marginRight: 10}} onClick={() => setShow(true)}>Создать папку</Button>
                            <DropdownBtn setSort={setSort}/>
                        </Col>
                        <Col/>
                        <Col sm={'auto'}>
                            <Button style={{marginRight: 10}} variant={'outline-danger'}
                                    onClick={() => setView('grid')}>
                                <Grid3x3GapFill/>
                            </Button>
                            <Button style={{marginLeft: 'auto'}} variant={'outline-danger'}
                                    onClick={() => setView('list')}>
                                <List/>
                            </Button>
                        </Col>
                    </Row>

                    <Form>
                        <Form.File
                            id="custom-file-translate-scss"
                            label="Загрузить файл"
                            lang="ru"
                            custom
                            multiple={true} type="file" onChange={fileUploadHandler}
                        />
                    </Form>
                    <CreateDirModal show={show} setShow={setShow} createDirHandler={createDirHandler}/>
                    <FileList view={view}/>
                </Container>
        </div>
            :
            <div className={classes.dropArea} onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <CloudUploadFill/>
            </div>
)

}
const DropdownBtn: React.FC<IDropDownBtnProps> = ({setSort}) => {
    return (
        <Dropdown style={{display: 'inline-block'}}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Сортировка
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onSelect={() => setSort('name')}>По имени</Dropdown.Item>
                <Dropdown.Item onSelect={() => setSort('type')}>По типу</Dropdown.Item>
                <Dropdown.Item onSelect={() => setSort('date')}>По дате</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default Disk

type IDropDownBtnProps = {
    setSort: any
}

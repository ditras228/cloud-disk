import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createDir, getFiles, uploadFile} from '../../redux/actions/file'
import FileList from './fileList/FileList'
import {Button, Col, Container, Dropdown, Form, Row, Spinner} from 'react-bootstrap'
import {fileReducerAction} from '../../redux/reducers/fileReducer'
import {CurrentDir, DirStack, GetIsMobile, Loader} from '../../redux/selectors'
import CreateDirModal from '../modal/CreateDirModal'
import {CloudUploadFill, Grid3x3GapFill, List} from 'react-bootstrap-icons'
import classes from './Disk.module.css'
import {DragEvent} from 'react'
import Uploader from './uploader/Uploader'
import {uploadReducerActions} from '../../redux/reducers/uploadReducer'
import {userReducerAction} from '../../redux/reducers/userReducer'
import LoaderFC from '../loader/LoaderFC'

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => CurrentDir(state))
    const [show, setShow] = useState(false)
    const dirStack = useSelector(state => DirStack(state))
    const loader = useSelector(state => Loader(state))
    const [sort, setSort] = useState('type')
    const [view, setView] = useState('list')
    const [dragEnter, setDragEnter] = useState(false)
    const [width, setWidth] = useState(0);

    const isMobile = useSelector(state => GetIsMobile(state))

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
        console.log(currentDir)
    }, [currentDir, sort])

    useEffect(() => {
        const updateWindowDimensions = () => {
            const newWidth = window.innerWidth;
            setWidth(newWidth);
        };
        window.addEventListener("resize", updateWindowDimensions);
        return () => window.removeEventListener("resize", updateWindowDimensions)
    }, [width]);

    useEffect(() => {
        if (window.innerWidth < 1000) {
            dispatch(userReducerAction.setMobile(true))
            setView('grid')
        }else{
            dispatch(userReducerAction.setMobile(false))
            setView('list')
        }
    }, [window.innerWidth])

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

    function dragEnterHandler(e: DragEvent<HTMLDivElement>) {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(e: DragEvent<HTMLDivElement>) {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(false)
    }

    function dropHandler(e: DragEvent<HTMLDivElement>) {
        e.preventDefault()
        e.stopPropagation()
        let files = Array.from(e.dataTransfer.files)

        files.forEach(file => {
            dispatch(uploadFile(file, currentDir))
            dispatch(uploadReducerActions.showUploader())
        })
        setDragEnter(false)
    }
    if (loader == true) {
        return <LoaderFC/>
    }
    return (!dragEnter ?
            <div onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <Container style={{marginBottom: 20}}>
                    <div className={classes.tools}>
                        <Button onClick={backClickHandler}>Назад</Button>
                        <Button onClick={() => setShow(true)}>Создать папку</Button>
                        <div className={classes.options}>
                            {!isMobile &&
                            <div className={classes.view}>
                                <Button variant={'outline-danger'}
                                        onClick={() => setView('grid')}>
                                    <Grid3x3GapFill/>
                                </Button>
                                <Button variant={'outline-danger'}
                                        onClick={() => setView('list')}>
                                    <List/>
                                </Button>
                            </div>
                            }
                            <DropdownBtn setSort={setSort}/>

                        </div>

                    </div>

                    <Form className={classes.uploadBtn}>
                        <Form.File
                            id="custom-file-translate-scss"
                            label="Загрузить файл"
                            lang="ru"
                            custom
                            multiple={true} type="file" onChange={fileUploadHandler}
                        />
                    </Form>
                    <CreateDirModal show={show} setShow={setShow} createDirHandler={createDirHandler}/>
                    <FileList view  ={view} setView={setView}/>
                    <Uploader/>
                </Container>
            </div>
            :
            <div className={classes.dropArea} onDrop={dropHandler} onDragEnter={dragEnterHandler}
                 onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <CloudUploadFill/>
            </div>
    )

}
const DropdownBtn: React.FC<IDropDownBtnProps> = ({setSort}) => {
    return (
        <Dropdown className={classes.dropdown}>
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

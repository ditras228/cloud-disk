import React, {DOMAttributes, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createDir, dropTo, getFiles, uploadFile} from '../../redux/actions/file'
import FileList from './fileList/FileList'
import {Button, ButtonGroup, Container, Dropdown, Form, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {
    CurrentDir,
    DirStack,
    GetDropTo,
    GetHand,
    GetIsMobile,
    GetUploadFilesByDrop,
    Loader
} from '../../redux/selectors'
import CreateDirModal from '../modal/CreateDirModal'
import {CloudUploadFill, Grid3x3GapFill, List, TrashFill} from 'react-bootstrap-icons'
import {DragEvent} from 'react'
import Uploader from './uploader/Uploader'
import LoaderFC from '../loader/LoaderFC'
import classes from './Disk.module.css'
import {actions} from '../../redux/actions/actions'
import NavFolder from './fileList/navFolder/navFolder'
import ToastFC from '../toast/Toast'

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
    const byDrop = useSelector(GetUploadFilesByDrop)
    const isMobile = useSelector(state => GetIsMobile(state))
    const folderInput= React.useRef(null)
    const[backButton, setBackButton] = useState(true)
    const dropToFolder = useSelector(state=>GetDropTo(state))
    const hand = useSelector(state=>GetHand(state))

    useEffect(() => {
        if(hand && dropToFolder)
            dispatch(dropTo(hand, dropToFolder))

    },[dropToFolder])

    useEffect(() => {
        dispatch(getFiles(currentDir?._id, sort))
    }, [currentDir, sort])

    useEffect(() => {
        const updateWindowDimensions = () => {
            const newWidth = window.innerWidth;
            setWidth(newWidth);
        };
        window.addEventListener("resize", updateWindowDimensions);
        return () => window.removeEventListener("resize", updateWindowDimensions)
    }, [width]);
    useEffect(()=>{
            dirStack.length<=1
                ?setBackButton(true)
                :setBackButton(false)
    },[dirStack.length])
    useEffect(() => {
        if (window.innerWidth < 1000) {
            dispatch(actions.user.setMobile(true))
            setView('grid')
        }else{
            dispatch(actions.user.setMobile(false))
            setView('list')
        }
    }, [window.innerWidth])

    function createDirHandler(name: string) {
        dispatch(createDir(currentDir, name))
    }

    function backClickHandler() {
        const backDirId =   dirStack.pop()
        dispatch(actions.file.setCurrentDir(backDirId._id))
    }

    function fileUploadHandler(event: { target: { files: any } }) {
        const files = [...event.target.files]
        dispatch(uploadFile(files, currentDir))

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

        dispatch(uploadFile(files, currentDir))
        dispatch(actions.upload.showUploader())
        setDragEnter(false)
    }
    if (loader) {
        return <LoaderFC/>
    }
    return (!dragEnter?
            <div onDragEnter={e=> byDrop? dragEnterHandler(e): ()=>{}}
                 onDragLeave={e=> byDrop?dragLeaveHandler(e):()=>{}}
                 onDragOver={e=> byDrop?dragEnterHandler(e): ()=>{}}>
                <Container style={{marginBottom: 20}}>
                    <div className={classes.tools}>
                        <Button onClick={backClickHandler} disabled={backButton}>Назад</Button>
                        <Button onClick={() => setShow(true)}>Создать папку</Button>
                        <div className={classes.options}>
                            {!isMobile &&
                            <div className={classes.view}>

                                <OverlayTrigger
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip id={`tooltip-grid`}>
                                            Сетка
                                        </Tooltip>
                                    }
                                >
                                    <Button variant={'outline-danger'}
                                            onClick={() => setView('grid')}>
                                        <Grid3x3GapFill/>
                                    </Button>
                                </OverlayTrigger>

                                <OverlayTrigger
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip id={`tooltip-list`}>
                                            Список
                                        </Tooltip>
                                    }
                                >
                                    <Button variant={'outline-danger'}
                                            onClick={() => setView('list')}>
                                        <List/>
                                    </Button>
                                </OverlayTrigger>

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
                            webkitdirectory={''} directory={''}
                            multiple={true} type="file" onChange={fileUploadHandler}
                            ref={folderInput}
                        />
                    </Form>
                    <CreateDirModal show={show} setShow={setShow} createDirHandler={createDirHandler}/>
                    <NavFolder/>
                    <FileList view  ={view} setView={setView}/>
                    <Uploader/>
                </Container>
                <ToastFC/>
            </div>
            :
            <div className={classes.dropArea} onDrop={dropHandler} onDragEnter={dragEnterHandler}
                 onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <CloudUploadFill/>
            </div>
    )

}
declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        directory?: string;
        webkitdirectory?: string;
        fileId?: string;
        fileType?: string;
    }
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

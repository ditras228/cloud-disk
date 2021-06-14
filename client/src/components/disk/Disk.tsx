import React, {DragEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createDir, dropTo, getFiles, uploadFile} from '../../redux/actions/file'
import FileList from './fileList/FileList'
import {Container} from 'react-bootstrap'
import {
    CurrentDir,
    DirStack,
    GetDropTo,
    GetHand,
    GetThisFile,
    GetUploadFilesByDrop,
    Loader
} from '../../redux/selectors'
import CreateDirModal from '../modal/CreateDirModal'
import {CloudUploadFill} from 'react-bootstrap-icons'
import Uploader from './uploader/Uploader'
import classes from './Disk.module.css'
import {actions} from '../../redux/actions/actions'
import NavFolder from './fileList/navFolder/navFolder'
import ShareModal from '../modal/ShareModal'
import {IFile} from '../../types/types'
import Footer from '../footer/Footer'
import Tools from './Tools'
import RegSuccess from '../modal/RegSuccess'

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => CurrentDir(state)) as IFile
    const [show, setShow] = useState(false)
    const dirStack = useSelector(state => DirStack(state))
    const [sort, setSort] = useState('type')
    const [view, setView] = useState('list')
    const [dragEnter, setDragEnter] = useState(false)
    const [width, setWidth] = useState(0)
    const byDrop = useSelector(GetUploadFilesByDrop)
    const [backButton, setBackButton] = useState(true)
    const dropToFolder = useSelector(state => GetDropTo(state)) as string
    const hand = useSelector(state => GetHand(state)) as IFile
    const thisFile = useSelector(state => GetThisFile(state)) as IFile
    const loader = useSelector(state => Loader(state))

    useEffect(() => {
        if (hand && dropToFolder && byDrop)
            dispatch(dropTo(hand, dropToFolder))
    }, [hand, dropToFolder, byDrop])

    useEffect(() => {
        dispatch(getFiles(currentDir?._id, sort))
    }, [currentDir, sort, thisFile])

    useEffect(() => {
        const updateWindowDimensions = () => {
            const newWidth = window.innerWidth
            setWidth(newWidth)
        }
        window.addEventListener('resize', updateWindowDimensions)
        return () => window.removeEventListener('resize', updateWindowDimensions)
    }, [width])
    useEffect(() => {
        console.log(dirStack)
        dirStack.length <= 1
            ? setBackButton(true)
            : setBackButton(false)
    }, [dirStack.length])
    useEffect(() => {
        if (window.innerWidth < 1000) {
            dispatch(actions.user.setMobile(true))
            setView('grid')
        } else {
            dispatch(actions.user.setMobile(false))
            setView('list')
        }
    }, [window.innerWidth])

    function createDirHandler(name: string) {
         if(currentDir?._id!=='0')
         dispatch(createDir(null, name))
        else{
             dispatch(createDir(currentDir?._id, name))

         }

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

        dispatch(uploadFile(files, currentDir._id))
        dispatch(actions.upload.showUploader())
        setDragEnter(false)
    }

    return (!dragEnter ?
            <div onDragEnter={e => byDrop ? dragEnterHandler(e) : () => {
            }}
                 onDragLeave={e => byDrop ? dragLeaveHandler(e) : () => {
                 }}
                 onDragOver={e => byDrop ? dragEnterHandler(e) : () => {
                 }}>
                <Container style={{marginBottom: 20}}>
                    <Tools setSort={setSort}
                           setShow={setShow}
                           setView={setView}
                           backButton={backButton}
                           currentDir={currentDir?._id}
                    />
                    <CreateDirModal show={show} setShow={setShow} createDirHandler={createDirHandler}/>
                    <NavFolder/>
                    <FileList view={view} loader={loader}/>
                    <Uploader/>
                    <RegSuccess/>
                    <ShareModal file={thisFile}/>
                </Container>
                <Footer/>
            </div>
            :
            <div className={classes.dropArea} onDrop={dropHandler} onDragEnter={dragEnterHandler}
                 onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <CloudUploadFill/>
            </div>
    )

}
export default Disk

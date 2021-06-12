import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {deleteFile, downloadFile} from '../../../../redux/actions/file'
import {IFile} from '../../../../types/types'
import {actions} from '../../../../redux/actions/actions'
import {GetTarget} from '../../../../redux/selectors'
import BreadCrumbFile from './breadCrumbFile'
import GridFile from './gridFile'
import ListFile from './listFile'
import FooterFile from './footerFile'

export {}
const FileFC: React.FC<FileProps> = ({file, view, loader,index}) => {
    const dispatch = useDispatch()
    const [fade, setFade] = useState(false)
    const target = useSelector(state => GetTarget(state))

    setTimeout(() => setFade(true), 0)

    const props = {
        openDirHandler() {
            if (file.type === 'dir' && !loader) {
                dispatch(actions.file.pushToStack(file))
                dispatch(actions.file.setCurrentDir(file))
            }
        },
        openNavDirHandler() {
            dispatch(actions.file.removeFromStack(index))
        },
        deleteClickHandler(e: React.MouseEvent<HTMLElement, MouseEvent>) {
            e.stopPropagation()
            dispatch(deleteFile(file))
        },
        shareFile(e: React.MouseEvent<HTMLElement, MouseEvent>) {
            e.stopPropagation()
            dispatch(actions.file.setThisFile(file))
            dispatch(actions.file.isShare(true))
        },
        downloadClickHandler(e: React.MouseEvent<HTMLElement, MouseEvent>) {
            e.stopPropagation()
            dispatch(downloadFile(file))
        },

        getName(name: string) {
            let newName: Array<string>
            if (file.type !== 'dir') {
                newName = name.split('.')
                return newName
            } else
                return name
        },
        dragOverHandler(e: any) {
            e.preventDefault()
            e.stopPropagation()
            e.currentTarget.style.border = '2px solid gray'
            dispatch(actions.file.setTarget(e.currentTarget))
        },

        dragLeaveHandler(e: any) {
            e.currentTarget.style.border = '2px solid transparent'
            dispatch(actions.file.setTarget(null))
        },

        dragStartHandler(e: any) {
            const target = e.currentTarget.style
            setTimeout(() => {
                dispatch(actions.upload.byDrop(false))
                dispatch(actions.file.setHand(file))
                target.display = 'none'
            }, 0)
        },
        dragEndHandler(e: any) {
            e.currentTarget.style.display = 'block'
            dispatch(actions.upload.byDrop(true))

        },
        dragEnter(e: any){
            e.preventDefault()
        },
        dropHandler(e: any) {
            const fileId = target.getAttribute('fileId')
            const fileType = target.getAttribute('fileType')

            if (fileType === 'dir' && target || index ===0) {
                e.currentTarget.style.border = '2px solid transparent'
                dispatch(actions.file.dropToFolder(fileId))
            } else {
                dispatch(actions.file.unDropToFolder())
            }


        },
    }
    switch (view) {
        case 'navFolder':
            return <BreadCrumbFile props={props} file={file} fade={fade} index={index}/>
        case 'grid':
            return <GridFile  props={props} file={file} fade={fade}/>
        case 'fooFile':
            return <FooterFile props={props} file={file} fade={fade}/>
        default:
            return <ListFile props={props} file={file} fade={fade}/>
    }

}

export default FileFC

type FileProps = {
    file: IFile,
    view: string,
    loader: boolean,
    index?: any
}
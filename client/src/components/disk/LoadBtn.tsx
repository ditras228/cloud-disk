import React, {useRef} from 'react'
import {Button, DropdownButton} from 'react-bootstrap'
import classes from './Disk.module.css'
import {FileEarmark, Folder} from 'react-bootstrap-icons'
import {useDispatch, useSelector} from 'react-redux'
import {GetIsMobile} from '../../redux/selectors'
import {uploadFile} from '../../redux/actions/file'

const LoadBtn: React.FC<any> = ({currentDir}) => {
    const dispatch = useDispatch()
    const isMobile = useSelector(state => GetIsMobile(state))
    const folderInput = useRef<HTMLInputElement>(null);
    const fileInput = useRef<HTMLInputElement>(null);

    function fileUploadHandler(event: { target: { files: any } }) {
        const files = [...event.target.files]
        dispatch(uploadFile(files, currentDir))
    }
    return (
        <>
            {!isMobile ?
                <DropdownButton
                    id="dropdown-basic-button"
                    title="Загрузить"
                    variant={'outline-primary'}
                >
                    <label htmlFor="file_input"
                           className={classes.dropdown_item}>
                        <div>
                            <FileEarmark className={classes.dropdown_i}/>
                            файл
                        </div>
                    </label>
                    <label htmlFor="folder_input"
                           className={classes.dropdown_item}>
                        <Folder className={classes.dropdown_i}/>
                        папку
                    </label>
                </DropdownButton>
                : <Button
                    variant={'outline-primary'}
                    onClick={()=>{
                    // @ts-ignore
                    fileInput.current.click()
                }}>
                    Загрузить
                </Button>
            }
                <input id={'file_input'}
                type="file"
                multiple={true}
                onChange={fileUploadHandler}
                ref={fileInput}
                className={classes.hideInput}
                />
                <input id={'folder_input'}
                type="file"
                webkitdirectory={''}
                directory={''}
                multiple={true}
                onChange={fileUploadHandler}
                ref={folderInput}
                className={classes.hideInput}
                />
           </>


    )
}

export default LoadBtn
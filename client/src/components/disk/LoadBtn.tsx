import React from 'react'
import {DropdownButton} from 'react-bootstrap'
import classes from './Disk.module.css'
import {FileEarmark, Folder} from 'react-bootstrap-icons'
import {useSelector} from 'react-redux'
import {GetIsMobile} from '../../redux/selectors'

const LoadBtn = () => {
    const isMobile = useSelector(state=> GetIsMobile(state))
    return (
        !isMobile?
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
            :<label
                htmlFor="file_input">
                <div>

                    Загрузить
                </div>
            </label>

    )
}

export default LoadBtn
import React from 'react'
import classes from './Disk.module.css'
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {Grid3x3GapFill, List} from 'react-bootstrap-icons'
import {DropdownBtn} from './DropDownBtn'
import {actions} from '../../redux/actions/actions'
import {useDispatch} from 'react-redux'
import LoadBtn from './LoadBtn'

const Tools: React.FC<any> = ({setSort, setShow, setView, backButton, currentDir}) => {
    const dispatch = useDispatch()

    function backClickHandler() {
        dispatch(actions.file.popStack())
    }



    return (
        <div className={classes.tools}>
            <Button
                onClick={backClickHandler}
                disabled={backButton}
                variant={'outline-primary'}
            >
                Назад
            </Button>
            <Button
                onClick={() => setShow(true)}
                variant={'outline-success'}
            >
                Создать папку
            </Button>
            <LoadBtn currentDir={currentDir}/>
            <div className={classes.options}>
                <div className={classes.view}>

                    <OverlayTrigger
                        placement={'bottom'}
                        overlay={
                            <Tooltip id={`tooltip-grid`}>
                                Сетка
                            </Tooltip>
                        }
                    >
                        <Button className={classes.boxBtn}
                                variant={'outline-danger'}
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
                        <Button className={classes.boxBtn}
                                variant={'outline-danger'}
                                onClick={() => setView('list')}>
                            <List/>
                        </Button>
                    </OverlayTrigger>

                </div>
                <DropdownBtn setSort={setSort}/>

            </div>




        </div>

    )
}

export default Tools
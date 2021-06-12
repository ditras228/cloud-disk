import React from 'react'
import {Dropdown} from 'react-bootstrap'
import classes from './Disk.module.css'

export const DropdownBtn: React.FC<IDropDownBtnProps> = ({setSort}) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="outline-success" id="dropdown-basic"  className={classes.dropdown}>
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
type IDropDownBtnProps = {
    setSort: any
}
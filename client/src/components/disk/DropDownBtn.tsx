import React from 'react'
import {Button, Dropdown} from 'react-bootstrap'
import classes from './Disk.module.css'
// @ts-ignore
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Button
        className={classes.dropdown}
        variant={'outline-success'}
        href=""
        // @ts-ignore
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </Button>
));
export const DropdownBtn: React.FC<IDropDownBtnProps> = ({setSort}) => {
    return (
        <Dropdown  className={classes.dropdown}>
            <Dropdown.Toggle
                                     as={CustomToggle} variant="outline-success" id="dropdown-basic">
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
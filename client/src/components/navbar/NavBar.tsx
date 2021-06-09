import React, {useState} from 'react'
import {Button, Form, FormControl, InputGroup, Navbar, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getFiles, searchFiles} from "../../redux/actions/file";
import {appReducerAction} from "../../redux/reducers/appReducer";
import {Disc, List, Search} from 'react-bootstrap-icons'
import {CurrentDir, IsAuth} from '../../redux/selectors'
import {userReducerAction} from '../../redux/reducers/userReducer'
import classes from './NavBar.module.css'

const NavBar = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const isAuth = useSelector(state=> IsAuth(state))
    const currentDir = useSelector(state => CurrentDir(state))

    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false as any)

    function searchChangeHandler(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        setSearchName(e.target.value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        dispatch(appReducerAction.showLoader())
        if (e.target.value !== '')
            setSearchTimeout(setTimeout(() => {
                dispatch(searchFiles(e.target.value))
            }, 500))
        else {
            dispatch(getFiles(currentDir, null))
        }
    }

    return (
        <Navbar bg="light" expand="lg" style={{marginBottom: 20}}>
    
            <OverlayTrigger
                placement={'bottom'}
                overlay={
                    <Tooltip id={`tooltip-logo`}>
                        Главная страница MERNDisk
                    </Tooltip>
                }
            >
                <Navbar.Brand className={classes.brand}><Disc className={classes.disc}/>MERNDisk</Navbar.Brand>
            </OverlayTrigger>


            <Navbar.Toggle aria-controls="basic-navbar-nav"/>

            <Navbar.Collapse id="basic-navbar-nav">
                <Form  className={classes.search}>
                    {isAuth &&<InputGroup >
                        <InputGroup.Prepend >
                            <InputGroup.Text id="basic-addon1">
                                <Search/>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="search"
                            placeholder="Поиск"
                            className="mr-2"
                            aria-label="Search"
                            value={searchName}
                            onChange={e => searchChangeHandler(e)}
                            onClick={()=>history.push('/')}
                        />
                    </InputGroup>}
                </Form>
                <Form inline style={{marginLeft: "auto"}}>

                    {!isAuth && <Button variant="outline-success"
                                        style={{marginRight: 10}}
                                        onClick={() => history.push('/login')}>
                        Войти
                    </Button>}
                    {!isAuth && <Button variant="outline-danger"
                                        onClick={() => history.push('/registration')}>
                        Регистрация
                    </Button>}
                    {isAuth &&<Button variant="outline-dark" style={{marginRight: 10}}
                                       onClick={() => history.push('/profile')}>
                        Профиль
                    </Button>}
                    {isAuth && <Button variant="outline-danger"
                                       onClick={() => dispatch(userReducerAction.logOut())}>
                       Выйти
                    </Button>}
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
import React from 'react';
import {Button, Form, Navbar} from "react-bootstrap";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../reducers/userReducer";

const NavBar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const history = useHistory()
    const dispatch = useDispatch()
    return (
        <Navbar bg="light" expand="lg" style={{marginBottom: 20}}>
            <Navbar.Brand href="#home">Cloud-disk</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline style={{marginLeft:"auto"}}>
                    {!isAuth&&<Button variant="outline-success"
                                      style={{marginRight: 10}}
                                      onClick={()=>history.push('/login')}>
                        Войти
                    </Button>}
                    {!isAuth&&<Button variant="outline-success"
                                      onClick={()=>history.push('/registration')}>
                        Регистрация
                    </Button>}
                    {isAuth&&<Button variant="outline-success"
                                      onClick={()=> dispatch(logOut())}>
                        Выйти
                    </Button>}
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
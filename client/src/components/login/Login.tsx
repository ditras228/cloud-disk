import React, {useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {login} from "../../redux/actions/user";

const Auth = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch = useDispatch()

    return (
        <div style={{display: 'flex', alignItems: 'center', height: 'calc(100vh - 56px)'}}>
            <Container >
                <Card style={{padding: 30, maxWidth:600, margin: 'auto'}}>
                    <Form onSubmit={e=>e.preventDefault()}>
                        <Form.Label  style={{fontSize: 25, paddingBottom:10}}>
                            Войти
                        </Form.Label>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Enter email"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control  value={password} onChange={e=>setPassword(e.target.value)}  type="password" placeholder="Password"/>
                        </Form.Group>
                        <Button size={"lg"} block variant="primary" type="submit" onClick={()=> dispatch(login(email, password))}>
                            Войти
                        </Button>
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default Auth;
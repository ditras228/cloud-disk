import React, {useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {registration} from "../actions/user";

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div style={{display: 'flex', alignItems: 'center', height: 'calc(100vh - 56px)'}}>
            <Container>
                <Card style={{padding: 30, maxWidth: 600, margin: 'auto'}}>
                    <Form onSubmit={e=>e.preventDefault()}>
                        <Form.Label style={{fontSize: 25, paddingBottom: 10}}>
                            Регистрация
                        </Form.Label>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email"
                                          placeholder="Enter email"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password"
                                          placeholder="Password"/>
                        </Form.Group>
                        <Button size={"lg"} block variant="primary" type="submit" onClick={()=>registration(email, password)}>
                            Регистрация
                        </Button>
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default Registration;
import React, {useState} from 'react'
import {Alert, Button, Card, Container, Form} from 'react-bootstrap'
import {registration} from '../../redux/actions/user'
import {useHistory} from 'react-router'
import {useFormik} from 'formik'
import * as Yup from 'yup'

const DisplayingErrorMessagesSchema = Yup.object().shape({
    password: Yup.string()
        .min(3, 'Too Short!')
        .max(12, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

const Registration = () => {
    const history = useHistory()

    const formik = useFormik({
            initialValues:{
                email: '',
                password: '',
            },
            validationSchema: DisplayingErrorMessagesSchema,
            onSubmit: values=>{
                registration(values.email, values.password).then(()=>history.push('/login'))

            }

        }

    )
    return (
        <div style={{display: 'flex', alignItems: 'center', height: 'calc(100vh - 56px)'}}>
            <Container>
                <Card style={{padding: 30, maxWidth: 600, margin: 'auto'}}>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Label style={{fontSize: 25, paddingBottom: 10}}>
                            Регистрация
                        </Form.Label>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                name={'email'}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                type="email"
                                          placeholder="Enter email"/>
                        </Form.Group>
                        {formik.errors.email && formik.touched.email ? (
                            <Alert variant={'danger'}>{formik.errors.email}</Alert>
                        ) : null}
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control
                                name={'password'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                type="password"
                                placeholder="Password"/>

                        </Form.Group>
                        {formik.errors.password && formik.touched.password ? (
                            <Alert variant={'danger'}>{formik.errors.password}</Alert>
                        ) : null}
                        <Button size={"lg"} block variant="primary" type="submit">
                            Регистрация
                        </Button>
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default Registration;
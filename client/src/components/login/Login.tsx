import React from 'react';
import {Alert, Button, Card, Container, Form} from 'react-bootstrap'
import {useDispatch} from "react-redux";
import {login} from "../../redux/actions/user";
import {useFormik} from 'formik'
import * as Yup from 'yup';
const DisplayingErrorMessagesSchema = Yup.object().shape({
    password: Yup.string()
        .min(3, 'Too Short!')
        .max(12, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});
const Auth = () => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            email: '',
            password: '',
        },
        validationSchema: DisplayingErrorMessagesSchema,
        onSubmit: values=>{
            dispatch(login(values.email, values.password))
        }

        }

    )
    return (
        <div style={{display: 'flex', alignItems: 'center', height: 'calc(100vh - 56px)'}}>
            <Container >
                <Card style={{padding: 30, maxWidth:600, margin: 'auto'}}>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Label  style={{fontSize: 25, paddingBottom:10}}>
                            Войти
                        </Form.Label>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                name={'email'}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                type="email"
                                placeholder="Email"/>
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
                                placeholder="Пороль"/>
                        </Form.Group>
                        {formik.errors.password && formik.touched.password ? (
                            <Alert variant={'danger'}>{formik.errors.password}</Alert>
                        ) : null}
                        <Button size={"lg"} block variant="primary" type="submit">
                            Войти
                        </Button>
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default Auth;
import React, {useEffect} from 'react'
import {Alert, Button, Card, Container, Form} from 'react-bootstrap'
import {registration} from '../../redux/actions/user'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {GetError, GetRegSuccess} from '../../redux/selectors'
import {useHistory} from 'react-router'

const DisplayingErrorMessagesSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Должен быть больше 5 символов')
        .max(12, 'Должен быть меньше 12 символов')
        .required('Обязательно'),
    email: Yup.string().email('Некорректный email').required('Обязательно'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пороли не совпадают')

})

const Registration = () => {
    const error = useSelector(state => GetError(state, 'reg'))
    const dispatch = useDispatch()
    const isSuccess = useSelector(state => GetRegSuccess(state))
    const history = useHistory()

    const formik = useFormik({
            initialValues: {
                email: '',
                password: '',
                passwordConfirmation: ''
            },
            validationSchema: DisplayingErrorMessagesSchema,
            onSubmit: values => {
                dispatch(registration(values.email, values.password))

            }

        }
    )
    return (
        <div style={{display: 'flex', alignItems: 'center', height: 'calc(100vh - 56px)'}}>
            {!isSuccess ? (
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
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control
                                        name={'passwordConfirmation'}
                                        value={formik.values.passwordConfirmation}
                                        onChange={formik.handleChange}
                                        type="password"
                                        placeholder="Повторите пороль"/>
                                </Form.Group>
                                {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation ? (
                                    <Alert variant={'danger'}>{formik.errors.passwordConfirmation}</Alert>
                                ) : null}
                                {error ? (
                                    <Alert variant={'danger'}>{error.text}</Alert>
                                ) : null}
                                <Button size={'lg'} block variant="primary" type="submit">
                                    Регистрация
                                </Button>
                            </Form>

                        </Card>

                    </Container>
                )
                : (
                    <div  style={{display: 'block', textAlign: 'center', width: '100%'}}>
                        <h2 style={{paddingBottom: 10}}>РЕГИСТРАЦИЯ ЗАВЕРШЕНА</h2>
                        <Button 
                            variant={'outline-success'} 
                            size={'lg'}
                            onClick={()=>history.push('/login')}
                        >ВОЙТИ</Button>
                    </div>
            )
            }

        </div>
    )
}

export default Registration
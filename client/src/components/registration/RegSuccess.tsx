import React from 'react'
import {Alert, Container} from 'react-bootstrap'

const RegSuccess = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center', height: 'calc(100vh - 56px)'}}>
            <Container>
                <Alert variant={'danger'}>Регистрация завершена!</Alert>
            </Container>
        </div>
    )
}

export default RegSuccess
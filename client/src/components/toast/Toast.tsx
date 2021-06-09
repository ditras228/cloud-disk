import React from 'react'
import {Toast} from 'react-bootstrap'
import {IFile} from '../../types/types'

const ToastFC = () => {
    return (
        <Toast style={{position: 'absolute', right: 20, bottom: 20}}>
            <Toast.Header>
                <strong className="mr-auto">/</strong>
            </Toast.Header>
            <Toast.Body>Файл удален</Toast.Body>
        </Toast>
    )
}

export default ToastFC
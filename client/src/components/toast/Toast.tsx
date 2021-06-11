import React, {useEffect, useState} from 'react'
import {Col, Fade, Row, Toast} from 'react-bootstrap'
import {GetToasts} from '../../redux/selectors'
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../redux/actions/actions'

const ToastList = () => {
    const toasts = useSelector(state => GetToasts(state))
    return (
        <Row xs={6} style={{position: 'absolute', right: 190, bottom: 20, width: '200px'}}>
            {toasts.map((toast: any, index: number) => (
                <ToastFC key={index} toast={toast}/>
            ))}
        </Row>
    )

}
const ToastFC: React.FC<IToast> = ({toast}) => {
    const [show, setShow] = useState(true)
    const dispatch = useDispatch()
    setTimeout(() =>{
        setShow(false)
    }, 10000)

    const closeHandler = ()=>{
        setShow(false)
        dispatch(actions.app.removeToast(toast.title))
    }
    return (
            <Toast show={show} onClose={()=>closeHandler()} animation={true}>
                <Toast.Header>
                    <strong className="mr-auto">
                        {toast.title}
                    </strong>
                </Toast.Header>
                <Toast.Body>
                    {toast.action}
                </Toast.Body>
            </Toast>

    )
}

type IToast = {
    toast: {
        title: string,
        action: string
    }
}
export default ToastList
import React, {useEffect} from 'react'
import {Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {submitUser} from '../../redux/actions/user'
import LoaderFC from '../loader/LoaderFC'
import {Loader} from '../../redux/selectors'
import {useHistory} from 'react-router'

const queryString = require('query-string');

const RegConfirm = () => {
    const dispatch = useDispatch()
    const parsed = queryString.parse(window.location.search)
    let loader = useSelector(state=>Loader(state))
    const history = useHistory()

    useEffect(() => {
        dispatch(submitUser (parsed['hash']))
    },[parsed['hash']])

    if(loader){
        return <LoaderFC/>
    }
    return (
        <div  style={{display: 'block', textAlign: 'center', width: '100%'}}>
            <h2 style={{paddingBottom: 10}}>ОШИБКА РЕГИСТРАЦИИ</h2>
            <Button
                variant={'outline-success'}
                size={'lg'}
                onClick={()=>history.push('/registration')}
            >ВОЙТИ</Button>
        </div>
    )
}

export default RegConfirm
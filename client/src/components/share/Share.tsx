import React, {useEffect, useState} from 'react'
import {Button, Card, Container} from 'react-bootstrap'
import classes from './Share.module.css'
import {CloudDownloadFill, FileEarmark, Folder} from 'react-bootstrap-icons'
import {IFile} from '../../types/types'
import sizeFormat from '../utils/sizeFormat'
import {useDispatch, useSelector} from 'react-redux'
import {GetThisFile, Loader} from '../../redux/selectors'
import {downloadFile, getFile} from '../../redux/actions/file'
import LoaderFC from '../loader/LoaderFC'
import {useHistory} from 'react-router'
const queryString = require('query-string');

const Share = () => {
    const parsed = queryString.parse(window.location.search)
    const dispatch = useDispatch()
    let loader = useSelector(state=>Loader(state))
    const thisFile = useSelector((state: any)=>GetThisFile(state)) as IFile
    const history = useHistory()

    useEffect(() => {
        dispatch(getFile(parsed['id']))
    },[parsed['id']])

    if(loader){
        return <LoaderFC/>
    }
    if(!thisFile && !loader){
        return  (
            <div  style={{display: 'block', textAlign: 'center', width: '100%'}}>
                <h2 style={{paddingBottom: 10}}>
                    404 Файл не найден
                </h2>
                <Button
                    variant={'outline-primary'}
                    size={'lg'}
                    onClick={()=>history.push('/')}
                >Вернуться на главную страницу</Button>
            </div>
        )
    }
    return (
        <Container>
            <Card  style={{maxWidth:600, margin: '0 auto'}}>
                <div className={classes.i}>
                    {
                        thisFile?.type === 'dir' ? <Folder/> : <FileEarmark/>
                    }
                </div>
                <Button size="lg"
                        onClick={()=>dispatch(downloadFile(thisFile))}
                ><CloudDownloadFill/>
                Скачать файл {thisFile?.name} ({sizeFormat(thisFile?.size)})
                </Button>
            </Card>
        </Container>
    )
}

export default Share
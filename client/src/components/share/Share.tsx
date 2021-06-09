import React from 'react'
import {Button, Card, Container} from 'react-bootstrap'
import classes from './Share.module.css'
import {CloudDownloadFill, FileEarmark, Folder} from 'react-bootstrap-icons'
import {IFile} from '../../types/types'
import sizeFormat from '../utils/sizeFormat'

const Share = (file:IFile) => {
    return (
        <Container>
            <Card  style={{maxWidth:600, margin: '0 auto'}}>
                <div className={classes.i}>
                    {
                        file.type === 'dir' ? <Folder/> : <FileEarmark/>
                    }
                </div>
                <Button size="lg"><CloudDownloadFill/> Скачать файл {file.name} ({sizeFormat(file.size)})</Button>
            </Card>
        </Container>
    )
}

export default Share
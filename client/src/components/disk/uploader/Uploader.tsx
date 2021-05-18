import React from 'react'
import {Card, ProgressBar} from 'react-bootstrap'
import classes from './Uploader.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {IsVisible, UploaderFiles} from '../../../redux/selectors'

const Uploader = () => {
    const files = useSelector(state => UploaderFiles(state))
    const isVisible = useSelector(state => IsVisible(state))
    const dispatch = useDispatch()
    console.log(files)

    return (
        <div className={classes.loader}>
            <Card className={classes.card}>
                <Card.Header>
                    Загрузки
                </Card.Header>
                <Card.Body>
                    {
                        files.map((file: any) => <FileProgress file={file} key={file.id}/>
                        )
                    }
                </Card.Body>
            </Card>
        </div>

    )
}
type FileProgressProps={
    file: any
}
const FileProgress: React.FC<FileProgressProps> = ({file}) => {
    return (
        <Card>
            <Card.Header>
                {file.name}
            </Card.Header>
            <Card.Body>
                <ProgressBar  now={file.progress}  label={`${file.progress}%`} />
            </Card.Body>
        </Card>

    )
}
export default Uploader